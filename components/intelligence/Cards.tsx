'use client'

import type { SFR } from '@/lib/sfr-types'

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(amount: number | null | undefined): string {
  if (amount == null) return 'N/A'
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount}`
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtConv(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

// ── Status badges ─────────────────────────────────────────────────────────────

const STATUS: Record<string, string> = {
  Commit: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  'Best Case': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  Pipeline: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  Omitted: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
}

// ── DealTableCard ──────────────────────────────────────────────────────────────

export function DealTableCard({ records, total_amount }: { records: SFR[]; total_amount: number }) {
  return (
    <div className="mt-2 rounded-xl overflow-hidden border border-white/10 bg-slate-800/60">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-700/40">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{records.length} deal{records.length !== 1 ? 's' : ''}</span>
        <span className="text-sm font-bold text-blue-300">Total: {fmt(total_amount)}</span>
      </div>
      <div className="divide-y divide-white/5">
        {records.map((r) => (
          <div key={r.Id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{r.parsed_account_name ?? r.Name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{r.Name} · {r.FiscalQuarter__c ?? '—'} · closes {fmtDate(r.ForecastCloseDate__c)}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {r.ForecastStatus__c && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS[r.ForecastStatus__c] ?? 'bg-slate-600 text-slate-300'}`}>
                  {r.ForecastStatus__c}
                </span>
              )}
              <span className="text-sm font-semibold text-white">{fmt(r.ForecastAmount__c)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── DealAnalysisCard ──────────────────────────────────────────────────────────

interface DealAnalysisProps {
  account: string; amount: number; stage: string; status: string
  close_date: string; health_score: number; health_rationale: string; summary: string
}

function HealthGauge({ score }: { score: number }) {
  const s = Math.max(0, Math.min(100, score))
  const color = s >= 70 ? '#10b981' : s >= 40 ? '#f59e0b' : '#ef4444'
  const label = s >= 70 ? 'Strong' : s >= 40 ? 'At Risk' : 'Critical'
  const r = 26, circ = 2 * Math.PI * r, offset = circ * (1 - s / 100)
  return (
    <div className="flex flex-col items-center w-16 shrink-0">
      <svg width="64" height="64" className="-rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#334155" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="text-base font-black -mt-12" style={{ color }}>{s}</span>
      <span className="text-[9px] mt-6 font-bold uppercase tracking-wide" style={{ color }}>{label}</span>
    </div>
  )
}

export function DealAnalysisCard(props: DealAnalysisProps) {
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-slate-800/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 bg-slate-700/40 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-white">{props.account}</div>
          <div className="text-xs text-slate-400 mt-0.5">{props.stage} · <span className={STATUS[props.status] ? 'text-blue-300' : 'text-slate-300'}>{props.status}</span> · closes {fmtDate(props.close_date)}</div>
        </div>
        <div className="text-lg font-bold text-blue-300">{fmt(props.amount)}</div>
      </div>
      <div className="flex gap-4 p-4">
        <HealthGauge score={props.health_score} />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-300 leading-relaxed">{props.summary}</p>
          {props.health_rationale && <p className="text-xs text-slate-500 mt-1.5 italic">{props.health_rationale}</p>}
        </div>
      </div>
    </div>
  )
}

// ── BlockersCard ──────────────────────────────────────────────────────────────

const SEV: Record<string, { bar: string; badge: string; icon: string }> = {
  critical: { bar: 'bg-red-500',    badge: 'bg-red-500/20 text-red-300 border border-red-500/40',    icon: '🔴' },
  high:     { bar: 'bg-orange-500', badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/40', icon: '🟠' },
  medium:   { bar: 'bg-yellow-500', badge: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40', icon: '🟡' },
}

const CAT_ICONS: Record<string, string> = { technical:'⚙️', budget:'💰', champion:'👤', competitive:'⚔️', process:'🔄', timing:'⏱️' }

interface Blocker { blocker: string; severity: string; category: string; evidence: string }
interface BlockersProps { account: string; blockers: Blocker[]; missing_information?: string[] }

export function BlockersCard({ account, blockers, missing_information }: BlockersProps) {
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-slate-800/60 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/10 bg-slate-700/40 flex items-center justify-between">
        <span className="text-sm font-bold text-white">Blockers — {account}</span>
        <span className="text-xs text-slate-400">{blockers.length} identified</span>
      </div>
      <div className="p-3 space-y-2">
        {blockers.map((b, i) => {
          const s = SEV[b.severity] ?? SEV.medium
          return (
            <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-700/30 border border-white/5">
              <div className={`w-1 rounded-full shrink-0 ${s.bar}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.badge}`}>{s.icon} {b.severity}</span>
                  <span className="text-xs text-slate-400">{CAT_ICONS[b.category] ?? ''} {b.category}</span>
                </div>
                <p className="text-sm text-white mt-1.5 font-medium">{b.blocker}</p>
                {b.evidence && <p className="text-xs text-slate-400 mt-1 italic">"{b.evidence}"</p>}
              </div>
            </div>
          )
        })}
        {missing_information && missing_information.length > 0 && (
          <div className="mt-1 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xs font-semibold text-yellow-400 mb-1">⚠️ Missing information</p>
            {missing_information.map((m, i) => <p key={i} className="text-xs text-yellow-300/80">• {m}</p>)}
          </div>
        )}
      </div>
    </div>
  )
}

// ── UseCasesCard ──────────────────────────────────────────────────────────────

const CONF: Record<string, string> = {
  high:   'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  medium: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  low:    'bg-slate-500/20 text-slate-400 border border-slate-500/30',
}

interface UseCase { name: string; monthly_conversations: number; consumption_driver: string; why_this_account: string; confidence: string }
interface UseCasesProps { account: string; use_cases: UseCase[] }

export function UseCasesCard({ account, use_cases }: UseCasesProps) {
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-slate-800/60 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/10 bg-slate-700/40">
        <span className="text-sm font-bold text-white">Top Use Cases — {account}</span>
        <p className="text-xs text-slate-400 mt-0.5">Ranked by Agentforce consumption potential</p>
      </div>
      <div className="p-3 space-y-2.5">
        {use_cases.map((uc, i) => (
          <div key={i} className="p-3 rounded-lg bg-slate-700/30 border border-white/5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-300 font-bold text-sm">#{i + 1}</span>
                <span className="text-sm font-semibold text-white">{uc.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${CONF[uc.confidence] ?? CONF.low}`}>{uc.confidence}</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-blue-300">{fmtConv(uc.monthly_conversations)}</span>
              <span className="text-xs text-slate-400">conversations/month</span>
            </div>
            <p className="text-xs text-slate-400 mt-1"><span className="text-slate-300 font-medium">Why: </span>{uc.why_this_account}</p>
            <p className="text-xs text-slate-500 mt-0.5"><span className="font-medium">Driver: </span>{uc.consumption_driver}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ActionsCard ───────────────────────────────────────────────────────────────

const URG: Record<string, { badge: string; label: string }> = {
  this_week:    { badge: 'bg-red-500/20 text-red-300 border border-red-500/30',     label: 'This week' },
  this_month:   { badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/30', label: 'This month' },
  next_quarter: { badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',  label: 'Next quarter' },
}

const OWN: Record<string, string> = {
  AE:'bg-purple-500/20 text-purple-300', SE:'bg-teal-500/20 text-teal-300',
  Specialist:'bg-blue-600/20 text-blue-300', Exec:'bg-yellow-500/20 text-yellow-300', Partner:'bg-slate-500/20 text-slate-300'
}

interface Action { action: string; owner: string; urgency: string; expected_impact: string }
interface ActionsProps { account: string; actions: Action[] }

export function ActionsCard({ account, actions }: ActionsProps) {
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-slate-800/60 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/10 bg-slate-700/40">
        <span className="text-sm font-bold text-white">Recommended Actions — {account}</span>
      </div>
      <div className="p-3 space-y-2">
        {actions.map((a, i) => {
          const u = URG[a.urgency] ?? URG.this_month
          return (
            <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-700/30 border border-white/5">
              <div className="h-6 w-6 rounded-full bg-slate-600 text-blue-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${u.badge}`}>{u.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${OWN[a.owner] ?? OWN.Partner}`}>{a.owner}</span>
                </div>
                <p className="text-sm text-white mt-1.5">{a.action}</p>
                {a.expected_impact && <p className="text-xs text-slate-400 mt-1"><span className="text-emerald-400 font-medium">Impact: </span>{a.expected_impact}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── StatsCard ─────────────────────────────────────────────────────────────────

const BAR_COLORS = ['bg-blue-400','bg-emerald-500','bg-yellow-500','bg-purple-500','bg-orange-500','bg-teal-500']

interface StatGroup { key: string; count: number; total_amount: number }
interface StatsProps { groups: StatGroup[]; grand_total: number; label?: string }

export function StatsCard({ groups, grand_total, label }: StatsProps) {
  const maxAmt = Math.max(...groups.map((g) => g.total_amount), 1)
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-slate-800/60 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/10 bg-slate-700/40 flex items-center justify-between">
        <span className="text-sm font-bold text-white">{label ?? 'Pipeline Overview'}</span>
        <span className="text-sm font-bold text-blue-300">{fmt(grand_total)}</span>
      </div>
      <div className="p-4 space-y-3">
        {groups.map((g, i) => (
          <div key={g.key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-300 font-medium truncate max-w-[55%]">{g.key ?? 'Unknown'}</span>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{g.count} deal{g.count !== 1 ? 's' : ''}</span>
                <span className="font-semibold text-white">{fmt(g.total_amount)}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-slate-700">
              <div className={`h-2 rounded-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all duration-700`} style={{ width: `${(g.total_amount / maxAmt) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
