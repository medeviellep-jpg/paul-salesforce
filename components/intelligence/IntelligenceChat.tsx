'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageRenderer } from './MessageRenderer'
import type { ChatMessage, SSEEvent } from '@/lib/sfr-types'

const TOOL_LABELS: Record<string, string> = {
  list_opportunities: 'Fetching opportunities…',
  get_deal_details: 'Loading deal details…',
  search_opportunities: 'Searching pipeline…',
  get_pipeline_stats: 'Computing pipeline stats…',
}

const SUGGESTED = [
  'Quelles sont mes top 10 opportunités Agentforce ce trimestre ?',
  'Analyse le deal Veterans Affairs',
  'Quels deals closent avant fin juillet ?',
  'Montre-moi le pipeline Best Case et Commit',
  'Quels sont les blocages sur mes deals > $1M ?',
  'Recommande les meilleurs use cases pour Wells Fargo',
]

interface Message { role: 'user' | 'assistant'; content: string }

export function IntelligenceChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [activeTools, setActiveTools] = useState<string[]>([])
  const [connected, setConnected] = useState<'checking' | 'ok' | 'error'>('checking')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then((d: { status: string; configured: boolean }) => setConnected(d.status === 'ok' && d.configured ? 'ok' : 'error'))
      .catch(() => setConnected('error'))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    const userMsg: Message = { role: 'user', content: trimmed }
    const nextMsgs = [...messages, userMsg]
    setMessages([...nextMsgs, { role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)
    setActiveTools([])

    const ctrl = new AbortController()
    abortRef.current = ctrl

    const history: ChatMessage[] = nextMsgs.map(m => ({ role: m.role, content: m.content }))

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
      signal: ctrl.signal,
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'assistant', content: `⚠️ ${(err as { error?: string }).error ?? 'Error'}` }
            return updated
          })
          return
        }

        const reader = res.body!.getReader()
        const decoder = new TextDecoder()
        let buf = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buf += decoder.decode(value, { stream: true })
          const lines = buf.split('\n')
          buf = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const evt = JSON.parse(line.slice(6)) as SSEEvent
              if (evt.type === 'text_delta') {
                setMessages(prev => {
                  const updated = [...prev]
                  const last = updated[updated.length - 1]
                  if (last?.role === 'assistant')
                    updated[updated.length - 1] = { ...last, content: last.content + evt.text }
                  return updated
                })
              } else if (evt.type === 'tool_use') {
                setActiveTools(prev =>
                  evt.status === 'running' ? [...prev, evt.tool_name] : prev.filter(t => t !== evt.tool_name)
                )
              } else if (evt.type === 'error') {
                setMessages(prev => {
                  const updated = [...prev]
                  const last = updated[updated.length - 1]
                  if (last?.role === 'assistant' && last.content === '')
                    updated[updated.length - 1] = { ...last, content: `⚠️ ${evt.message}` }
                  return updated
                })
              }
            } catch { /* skip malformed */ }
          }
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setMessages(prev => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last?.role === 'assistant' && last.content === '')
              updated[updated.length - 1] = { ...last, content: `⚠️ Connection error: ${err.message}` }
            return updated
          })
        }
      })
      .finally(() => {
        setStreaming(false)
        setActiveTools([])
      })
  }, [messages, streaming])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input) }
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Agentforce Deal Intelligence</h1>
            <p className="text-xs text-slate-400">Powered by Claude · Salesforce live data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${connected === 'ok' ? 'bg-emerald-400' : connected === 'error' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'}`} />
          <span className="text-xs text-slate-400">
            {connected === 'ok' ? 'Connected' : connected === 'error' ? 'Not connected' : 'Connecting…'}
          </span>
        </div>
      </header>

      {/* Thread */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {!hasMessages && (
            <div className="flex flex-col items-center justify-center py-12 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h2 className="text-xl font-bold text-white">Bonjour, comment puis-je vous aider ?</h2>
                <p className="text-slate-400 mt-2 text-sm">Interrogez votre pipeline Agentforce en langage naturel.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
                {SUGGESTED.map(p => (
                  <button key={p} onClick={() => handleSend(p)}
                    className="text-left px-4 py-3 rounded-xl border border-white/10 bg-slate-800/60 hover:bg-slate-700/60 hover:border-blue-400/40 text-sm text-slate-300 transition-all duration-150">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                {msg.role === 'user' ? 'U' : 'AI'}
              </div>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-800 rounded-tl-sm border border-white/5'}`}>
                {msg.role === 'assistant' ? (
                  msg.content === '' && streaming
                    ? <TypingIndicator activeTools={activeTools} />
                    : <MessageRenderer content={msg.content} />
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/10 bg-slate-900/95 backdrop-blur-sm px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question sur le pipeline Agentforce…"
            rows={1}
            disabled={streaming}
            className="flex-1 resize-none bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 transition-all disabled:opacity-50"
            style={{ minHeight: '44px', maxHeight: '160px', overflowY: 'auto' }}
            onInput={e => {
              const t = e.target as HTMLTextAreaElement
              t.style.height = 'auto'
              t.style.height = `${Math.min(t.scrollHeight, 160)}px`
            }}
          />
          {streaming ? (
            <button onClick={() => abortRef.current?.abort()}
              className="h-11 w-11 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
            </button>
          ) : (
            <button onClick={() => handleSend(input)} disabled={!input.trim()}
              className="h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">Enter pour envoyer · Shift+Enter pour une nouvelle ligne</p>
      </div>
    </div>
  )
}

function TypingIndicator({ activeTools }: { activeTools: string[] }) {
  const label = activeTools.length > 0 ? (TOOL_LABELS[activeTools[activeTools.length - 1]] ?? 'Analysing…') : null
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
      {label && <span className="text-xs text-slate-400 animate-pulse">{label}</span>}
    </div>
  )
}
