'use client'

import { useState, useEffect } from 'react'

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (sessionStorage.getItem('af-access') === 'granted') {
      setAuthorized(true)
    }
  }, [])

  if (!mounted) return null

  if (authorized) return <>{children}</>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === process.env.NEXT_PUBLIC_ACCESS_CODE) {
      sessionStorage.setItem('af-access', 'granted')
      setAuthorized(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0176D3] to-[#7C3AED] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Agentforce Portfolio</h1>
          <p className="text-white/50 text-sm">Entrez le code d'accès pour continuer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code d'accès"
              autoFocus
              className={`w-full px-5 py-4 rounded-xl bg-white/[0.05] border text-white placeholder-white/30 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0176D3] transition-all ${
                error ? 'border-red-500 shake' : 'border-white/10'
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm text-center mt-2">Code incorrect</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#0176D3] text-white font-semibold text-lg hover:bg-[#1B96FF] transition-colors shadow-lg"
          >
            Accéder
          </button>
        </form>

        <p className="text-white/30 text-xs text-center mt-8">Meeting Managers — Juillet 2026</p>
      </div>
    </div>
  )
}
