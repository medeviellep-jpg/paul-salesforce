import { NextRequest } from "next/server"
import { buildSystemPrompt } from "@/app/data/products-context"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? ""
const ANTHROPIC_API = "https://api.anthropic.com/v1/messages"

const systemPrompt = buildSystemPrompt()

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), { status: 500 })
  }

  let body: { messages: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
  }

  if (!Array.isArray(body?.messages) || body.messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages array required" }), { status: 400 })
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder()

      function send(event: object) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
      }

      const messages = body.messages.slice(-20).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }))

      let res: Response
      try {
        res = await fetch(ANTHROPIC_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 2048,
            system: systemPrompt,
            messages,
            stream: true,
          }),
        })
      } catch (err) {
        send({ type: "error", message: `Network error: ${(err as Error).message}` })
        send({ type: "done" })
        controller.close()
        return
      }

      if (!res.ok) {
        const errText = await res.text().catch(() => "unknown")
        send({ type: "error", message: `API error ${res.status}: ${errText.slice(0, 200)}` })
        send({ type: "done" })
        controller.close()
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const raw = line.slice(6).trim()
          if (raw === "[DONE]") continue

          try {
            const evt = JSON.parse(raw)
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
              send({ type: "text_delta", text: evt.delta.text })
            } else if (evt.type === "message_stop") {
              break
            }
          } catch { /* skip malformed */ }
        }
      }

      send({ type: "done" })
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}
