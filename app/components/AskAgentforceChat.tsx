'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Quelle différence entre Help Agent et Agentforce for Service ?',
  'Quelle différence entre Qualified et SDR Agent ?',
  'Quelles sont toutes les capacités de Agentforce Voice GA pour la France ?',
  'Quelles sont les sweet spots pour vendre Agentforce Operations ?',
  'Momentum ça sert à quoi ?',
]

export function AskAgentforceChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleSend = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    const userMsg: Message = { role: 'user', content: trimmed }
    const nextMsgs = [...messages, userMsg]
    setMessages([...nextMsgs, { role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)

    const ctrl = new AbortController()
    abortRef.current = ctrl

    fetch('/api/ask-agentforce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: nextMsgs }),
      signal: ctrl.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'assistant', content: `⚠️ ${(err as { error?: string }).error ?? 'Erreur'}` }
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
              const evt = JSON.parse(line.slice(6))
              if (evt.type === 'text_delta') {
                setMessages((prev) => {
                  const updated = [...prev]
                  const last = updated[updated.length - 1]
                  if (last?.role === 'assistant')
                    updated[updated.length - 1] = { ...last, content: last.content + evt.text }
                  return updated
                })
              } else if (evt.type === 'error') {
                setMessages((prev) => {
                  const updated = [...prev]
                  const last = updated[updated.length - 1]
                  if (last?.role === 'assistant' && last.content === '')
                    updated[updated.length - 1] = { ...last, content: `⚠️ ${evt.message}` }
                  return updated
                })
              }
            } catch { /* skip */ }
          }
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last?.role === 'assistant' && last.content === '')
              updated[updated.length - 1] = { ...last, content: `⚠️ Erreur de connexion` }
            return updated
          })
        }
      })
      .finally(() => setStreaming(false))
  }, [messages, streaming])

  if (!isOpen) return null

  const hasMessages = messages.length > 0

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl h-[80vh] max-h-[700px] mx-4 rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-[#0B5CAB] to-[#1B96FF] px-6 py-8 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="w-14 h-14 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-white">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>

          {!hasMessages && (
            <h2 className="text-xl font-bold text-white">Comment Agentforce peut vous aider ?</h2>
          )}
          {hasMessages && (
            <h2 className="text-lg font-semibold text-white/90">Ask Agentforce</h2>
          )}
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto bg-[#0D1117] px-4 py-4">
          {!hasMessages && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-white/70 hover:text-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-[#1B96FF] text-white' : 'bg-white/10 text-white/70'}`}>
                {msg.role === 'user' ? 'U' : 'A'}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#1B96FF] text-white rounded-tr-sm' : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-sm'}`}>
                {msg.role === 'assistant' && msg.content === '' && streaming ? (
                  <div className="flex gap-1 py-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-[#1B96FF] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="shrink-0 bg-[#0D1117] border-t border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input) }
              }}
              placeholder="Posez votre question sur Agentforce..."
              disabled={streaming}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1B96FF]/50 focus:ring-1 focus:ring-[#1B96FF]/20 transition-all disabled:opacity-50"
            />
            {streaming ? (
              <button
                onClick={() => abortRef.current?.abort()}
                className="h-10 w-10 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
              </button>
            ) : (
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="h-10 w-10 rounded-xl bg-[#1B96FF] hover:bg-[#1B96FF]/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
