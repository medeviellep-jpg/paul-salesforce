import { toolDefinitions, executeTool } from "./intelligence-tools";
import type { ChatMessage } from "./sfr-types";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are an expert Agentforce sales specialist AI assistant embedded inside Salesforce. You help sales teams understand their Agentforce pipeline, identify blockers, and recommend winning strategies.

You have access to live Salesforce data through your tools. Always fetch real data before answering — never invent deal names, amounts, or details.

BEHAVIOR RULES:
- Respond in the same language as the user (French or English)
- For pipeline questions: call list_opportunities or get_pipeline_stats first
- For a specific deal: call get_deal_details, then reason over all fields
- For vague queries ("my best deals", "what's at risk"): use list_opportunities with appropriate filters, then synthesize
- When analyzing a deal: always assess (1) use cases, (2) blockers, (3) next best actions — in that order
- Amounts: always format as $XM or $XK, never raw numbers
- Dates: always show as "June 25, 2026 (FY27 Q2)"
- When a deal's narrative fields are empty: say so explicitly and suggest what the rep should add
- You may call multiple tools in the same turn (e.g. "compare Dell and Wells Fargo")
- If the user refers to "ce deal" / "this one" / "it": resolve from conversation history first

RESPONSE FORMAT RULES:
Embed rich cards using these EXACT comment tags with valid single-line JSON between them:

Deal list:
<!-- CARD:deal_table -->
{"records":[...],"total_amount":0}
<!-- /CARD -->

Single deal deep-dive:
<!-- CARD:deal_analysis -->
{"account":"...","amount":0,"stage":"...","status":"...","close_date":"...","health_score":75,"health_rationale":"...","summary":"..."}
<!-- /CARD -->

Blockers:
<!-- CARD:blockers -->
{"account":"...","blockers":[{"blocker":"...","severity":"high","category":"competitive","evidence":"..."}],"missing_information":["..."]}
<!-- /CARD -->

Use cases:
<!-- CARD:use_cases -->
{"account":"...","use_cases":[{"name":"...","monthly_conversations":5000,"consumption_driver":"...","why_this_account":"...","confidence":"high"}]}
<!-- /CARD -->

Recommended actions:
<!-- CARD:actions -->
{"account":"...","actions":[{"action":"...","owner":"AE","urgency":"this_week","expected_impact":"..."}]}
<!-- /CARD -->

Pipeline stats:
<!-- CARD:stats -->
{"groups":[{"key":"...","count":0,"total_amount":0}],"grand_total":0,"label":"..."}
<!-- /CARD -->

For plain Q&A: plain markdown text only.

AGENTFORCE DOMAIN KNOWLEDGE:
- High-consumption use cases: Autonomous Service Agent, SDR Agent, Field Service Dispatch, Claims Processing, HR Onboarding, IT Help Desk
- Consumption drivers: high-volume repetitive interactions, multi-step autonomy, Data Cloud grounding with D360
- Deal "at risk": close < 30 days AND stage < 04, OR Red_Flags__c not null, OR Microsoft competitor with no differentiator
- Budget signals: Approved_Budget__c = true strong positive; ROI_Business_Case_Completed__c = true accelerates close
- Health score: 80-100 = green, 40-79 = amber, 0-39 = red`;

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string | AnthropicContent[];
}

interface AnthropicContent {
  type: string;
  [key: string]: unknown;
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function runAgentStream(
  messages: ChatMessage[],
  controller: ReadableStreamDefaultController<Uint8Array>
): Promise<void> {
  const encoder = new TextEncoder();

  function send(event: object) {
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
  }

  const history: AnthropicMessage[] = messages.slice(-20).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  let retries = 0;

  while (true) {
    // Call Anthropic with streaming
    let res: Response;
    try {
      res = await fetch(ANTHROPIC_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          tools: toolDefinitions,
          messages: history,
          stream: true,
        }),
      });
    } catch (err) {
      send({ type: "error", message: `Network error: ${(err as Error).message}` });
      send({ type: "done" });
      controller.close();
      return;
    }

    if (res.status === 529 && retries < 3) {
      retries++;
      await sleep(2 ** retries * 1000);
      continue;
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => "unknown");
      send({ type: "error", message: `Claude API error ${res.status}: ${errText.slice(0, 200)}` });
      send({ type: "done" });
      controller.close();
      return;
    }

    retries = 0;

    // Parse SSE stream from Anthropic
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    const assistantContent: AnthropicContent[] = [];
    const toolUseBlocks: Array<{ id: string; name: string; input_json: string }> = [];
    let stopReason: string | null = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (raw === "[DONE]") continue;

        let evt: Record<string, unknown>;
        try { evt = JSON.parse(raw); } catch { continue; }

        const evtType = evt.type as string;

        if (evtType === "content_block_start") {
          const block = evt.content_block as AnthropicContent;
          assistantContent.push(block);
          if (block.type === "tool_use") {
            toolUseBlocks.push({
              id: block.id as string,
              name: block.name as string,
              input_json: "",
            });
            send({ type: "tool_use", tool_name: block.name, status: "running" });
          }
        } else if (evtType === "content_block_delta") {
          const delta = evt.delta as AnthropicContent;
          if (delta.type === "text_delta") {
            send({ type: "text_delta", text: delta.text as string });
          } else if (delta.type === "input_json_delta") {
            const last = toolUseBlocks[toolUseBlocks.length - 1];
            if (last) last.input_json += delta.partial_json as string;
          }
        } else if (evtType === "message_delta") {
          const d = evt.delta as { stop_reason?: string };
          if (d.stop_reason) stopReason = d.stop_reason;
        }
      }
    }

    // Parse tool input JSON and patch assistantContent
    for (const tb of toolUseBlocks) {
      try {
        const parsed = JSON.parse(tb.input_json || "{}");
        const block = assistantContent.find((b) => b.type === "tool_use" && (b as { id: string }).id === tb.id);
        if (block) (block as Record<string, unknown>).input = parsed;
      } catch {
        // keep empty input
      }
    }

    if (stopReason === "end_turn" || toolUseBlocks.length === 0) {
      send({ type: "done" });
      controller.close();
      return;
    }

    // Execute tools in parallel
    const toolResults = await Promise.all(
      toolUseBlocks.map(async (tb) => {
        let output: unknown;
        try {
          const block = assistantContent.find((b) => b.type === "tool_use" && (b as { id: string }).id === tb.id);
          const toolInput = (block as Record<string, unknown>)?.input as Record<string, unknown> ?? {};
          output = await Promise.race([
            executeTool(tb.name, toolInput),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Tool timeout")), 10_000)),
          ]);
        } catch (err) {
          output = { error: (err as Error).message };
        }
        send({ type: "tool_use", tool_name: tb.name, status: "done" });
        return { type: "tool_result", tool_use_id: tb.id, content: JSON.stringify(output) };
      })
    );

    history.push(
      { role: "assistant", content: assistantContent },
      { role: "user", content: toolResults as unknown as AnthropicContent[] }
    );
  }
}
