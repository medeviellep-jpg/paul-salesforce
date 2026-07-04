'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  TrendingUp,
  Target,
  Wallet,
  Zap,
  BrainCircuit,
} from 'lucide-react'
import clsx from 'clsx'

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/meetings', label: 'Meetings', icon: Calendar },
  { href: '/pipeline', label: 'Pipeline', icon: TrendingUp },
  { href: '/roadmap', label: 'Big Bets & Roadmap', icon: Target },
  { href: '/fundings', label: 'Catalyst & SIP', icon: Wallet },
]

const aiNav = [
  { href: '/intelligence', label: 'Deal Intelligence', icon: BrainCircuit },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sf-navy min-h-screen flex flex-col">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sf-blue flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Agentforce</p>
            <p className="text-white/50 text-xs">France FY27</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white/90'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <p className="text-white/30 text-xs px-3 py-1 uppercase tracking-wider font-medium">AI</p>
        {aiNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white/90'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </div>
      <div className="p-4 border-t border-white/10">
        <p className="text-white/30 text-xs text-center">© Salesforce FY27</p>
      </div>
    </aside>
  )
}
