'use client'

import { parseSegments } from './card-parser'
import { DealTableCard, DealAnalysisCard, BlockersCard, UseCasesCard, ActionsCard, StatsCard } from './Cards'
import type { SFR } from '@/lib/sfr-types'

function renderCard(type: string, data: unknown) {
  switch (type) {
    case 'deal_table':    return <DealTableCard {...(data as { records: SFR[]; total_amount: number })} />
    case 'deal_analysis': return <DealAnalysisCard {...(data as Parameters<typeof DealAnalysisCard>[0])} />
    case 'blockers':      return <BlockersCard {...(data as Parameters<typeof BlockersCard>[0])} />
    case 'use_cases':     return <UseCasesCard {...(data as Parameters<typeof UseCasesCard>[0])} />
    case 'actions':       return <ActionsCard {...(data as Parameters<typeof ActionsCard>[0])} />
    case 'stats':         return <StatsCard {...(data as Parameters<typeof StatsCard>[0])} />
    default:              return <pre className="text-xs text-slate-500 overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
  }
}

// Very minimal markdown renderer (bold, italic, code, headings, lists, links)
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []

  let listItems: string[] = []

  function flushList() {
    if (listItems.length) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-0.5 my-1">
          {listItems.map((item, i) => <li key={i} className="text-slate-300 text-sm">{inlineFormat(item)}</li>)}
        </ul>
      )
      listItems = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (/^#{1,3}\s/.test(line)) {
      flushList()
      const level = line.match(/^(#{1,3})/)?.[1].length ?? 1
      const content = line.replace(/^#{1,3}\s+/, '')
      const cls = level === 1 ? 'text-base font-bold text-white mt-3 mb-1' : level === 2 ? 'text-sm font-bold text-white mt-2 mb-0.5' : 'text-sm font-semibold text-slate-200 mt-1.5'
      elements.push(<div key={i} className={cls}>{content}</div>)
    } else if (/^\s*[-*]\s/.test(line)) {
      listItems.push(line.replace(/^\s*[-*]\s+/, ''))
    } else if (/^\s*\d+\.\s/.test(line)) {
      flushList()
      const content = line.replace(/^\s*\d+\.\s+/, '')
      elements.push(<div key={i} className="text-sm text-slate-300 pl-5 my-0.5">{inlineFormat(content)}</div>)
    } else if (line.trim() === '') {
      flushList()
      if (i > 0 && lines[i - 1].trim() !== '') elements.push(<div key={i} className="h-1.5" />)
    } else {
      flushList()
      elements.push(<p key={i} className="text-sm text-slate-300 leading-relaxed">{inlineFormat(line)}</p>)
    }
  }
  flushList()
  return <div className="space-y-0.5">{elements}</div>
}

function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-slate-700 text-blue-200 px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i} className="text-slate-200 italic">{part.slice(1, -1)}</em>
    return part
  })
}

export function MessageRenderer({ content }: { content: string }) {
  const segments = parseSegments(content)
  return (
    <div className="space-y-1">
      {segments.map((seg, i) =>
        seg.kind === 'text'
          ? <SimpleMarkdown key={i} text={seg.content} />
          : <div key={i}>{renderCard(seg.card.type, seg.card.data)}</div>
      )}
    </div>
  )
}
