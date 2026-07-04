import { NextRequest } from "next/server";
import { runAgentStream } from "@/lib/intelligence-agent";
import type { ChatMessage } from "@/lib/sfr-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  let body: { messages: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!Array.isArray(body?.messages) || body.messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages array required" }), { status: 400 });
  }

  const last = body.messages[body.messages.length - 1];
  if (last?.role !== "user") {
    return new Response(JSON.stringify({ error: "Last message must be from user" }), { status: 400 });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        await runAgentStream(body.messages, controller);
      } catch (err) {
        const encoder = new TextEncoder();
        const msg = (err as Error).message ?? "Internal error";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message: msg })}\n\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
