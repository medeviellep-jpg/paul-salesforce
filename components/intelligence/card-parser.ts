export type CardType = "deal_table" | "deal_analysis" | "blockers" | "use_cases" | "actions" | "stats";

export interface ParsedCard { type: CardType; data: unknown }
export type MessageSegment =
  | { kind: "text"; content: string }
  | { kind: "card"; card: ParsedCard };

const CARD_RE = /<!--\s*CARD:([\w_]+)\s*-->\s*([\s\S]*?)\s*<!--\s*\/CARD\s*-->/g;

export function parseSegments(text: string): MessageSegment[] {
  const segments: MessageSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(CARD_RE)) {
    const [full, cardType, jsonRaw] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) {
      const pre = text.slice(lastIndex, start).trim();
      if (pre) segments.push({ kind: "text", content: pre });
    }
    try {
      segments.push({ kind: "card", card: { type: cardType as CardType, data: JSON.parse(jsonRaw.trim()) } });
    } catch {
      segments.push({ kind: "text", content: full });
    }
    lastIndex = start + full.length;
  }

  const tail = text.slice(lastIndex).trim();
  if (tail) segments.push({ kind: "text", content: tail });
  return segments;
}
