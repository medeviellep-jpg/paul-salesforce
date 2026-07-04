'use client'

import { useState, useMemo } from 'react'
import { opportunities, bigBets, formatAmount } from '@/lib/mock-data'
import { stageBadge } from '@/components/Badge'
import { TrendingUp, Search, ArrowUpDown } from 'lucide-react'
import type { FiscalQuarter, SalesStage } from '@/lib/types'

type SortKey = 'amount' | 'closeDate' | 'stage' | 'account'
type SortDir = 'asc' | 'desc'

const STAGES: SalesStage[] = [
  '1 - Prospecting', '2 - Qualification', '3 - Discovery',
  '4 - Proposal', '5 - Value Proposition', '6 - Negotiation',
  '7 - Closed Won', '8 - Closed Lost',
]

const stageColor: Record<string, string> = {
  '7 - Closed Won': 'bg-green-500',
  '8 - Closed Lost': 'bg-red-400',
  '6 - Negotiation': 'bg-purple-500',
  '5 - Value Proposition': 'bg-blue-500',
  '4 - Proposal': 'bg-teal-500',
  '3 - Discovery': 'bg-amber-400',
  '2 - Qualification': 'bg-gray-400',
  '1 - Prospecting': 'bg-gray-300',
}

export default function PipelinePage() {
  const [search, setSearch] = useState('')
  const [quarterFilter, setQuarterFilter] = useState<FiscalQuarter | 'all'>('all')
  const [stageFilter, setStageFilter] = useState<SalesStage | 'all'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('amount')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    let res = opportunities.filter(o => {
      if (search && !o.account.toLowerCase().includes(search.toLowerCase()) && !o.name.toLowerCase().includes(search.toLowerCase())) return false
      if (quarterFilter !== 'all' && o.quarter !== quarterFilter) return false
      if (stageFilter !== 'all' && o.stage !== stageFilter) return false
      return true
    })
    res.sort((a, b) => {
      let diff = 0
      if (sortKey === 'amount') diff = a.amount - b.amount
      else if (sortKey === 'closeDate') diff = a.closeDate.localeCompare(b.closeDate)
      else if (sortKey === 'stage') diff = a.stage.localeCompare(b.stage)
      else if (sortKey === 'account') diff = a.account.localeCompare(b.account)
      return sortDir === 'desc' ? -diff : diff
    })
    return res
  }, [search, quarterFilter, stageFilter, sortKey, sortDir])

  const total = filtered.reduce((s, o) => s + o.amount, 0)
  const weighted = filtered.reduce((s, o) => s + o.amount * (o.probability ?? 0) / 100, 0)

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  // Pipeline by stage chart data
  const byStage = STAGES.map(stage => ({
    stage,
    amount: opportunities.filter(o => o.stage === stage).reduce((s, o) => s + o.amount, 0),
    count: opportunities.filter(o => o.stage === stage).length,
  })).filter(s => s.amount > 0)

  const maxAmount = Math.max(...byStage.map(s => s.amount))

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-sf-gray-9">Pipeline</h1>
        <p className="text-sf-gray-5 text-sm mt-0.5">Opportunités Agentforce France — triées par montant, quarter et stage</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(['Q2', 'Q3', 'Q4'] as FiscalQuarter[]).map(q => {
          const qOpps = opportunities.filter(o => o.quarter === q)
          const qTotal = qOpps.reduce((s, o) => s + o.amount, 0)
          const won = qOpps.filter(o => o.stage === '7 - Closed Won').reduce((s, o) => s + o.amount, 0)
          return (
            <div key={q} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-semibold text-sf-gray-5 uppercase">{q} FY27</p>
              <p className="text-xl font-bold text-sf-gray-9 mt-1">{formatAmount(qTotal)}</p>
              <p className="text-xs text-green-600 mt-0.5">Won: {formatAmount(won)}</p>
              <p className="text-xs text-sf-gray-5">{qOpps.length} opp(s)</p>
            </div>
          )
        })}
        <div className="bg-sf-navy rounded-xl p-4 text-white">
          <p className="text-xs font-semibold text-white/60 uppercase">Pondéré global</p>
          <p className="text-xl font-bold mt-1">{formatAmount(weighted)}</p>
          <p className="text-xs text-white/60 mt-0.5">Total brut: {formatAmount(opportunities.reduce((s,o)=>s+o.amount,0))}</p>
        </div>
      </div>

      {/* Stage funnel */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-sf-gray-9 mb-4">Répartition par Stage</h2>
        <div className="space-y-2">
          {byStage.map(s => (
            <div key={s.stage} className="flex items-center gap-3">
              <div className="text-xs text-sf-gray-5 w-32 truncate">{s.stage.replace(/^\d - /, '')}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                <div
                  className={`h-5 rounded-full flex items-center justify-end pr-2 transition-all ${stageColor[s.stage] ?? 'bg-gray-400'}`}
                  style={{ width: `${(s.amount / maxAmount) * 100}%`, minWidth: '40px' }}
                >
                  <span className="text-xs text-white font-medium">{s.count}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-sf-gray-9 w-20 text-right">{formatAmount(s.amount)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 focus:border-sf-blue"
          />
        </div>
        <select
          value={quarterFilter}
          onChange={e => setQuarterFilter(e.target.value as FiscalQuarter | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 bg-white"
        >
          <option value="all">Tous les quarters</option>
          <option value="Q2">Q2 FY27</option>
          <option value="Q3">Q3 FY27</option>
          <option value="Q4">Q4 FY27</option>
        </select>
        <select
          value={stageFilter}
          onChange={e => setStageFilter(e.target.value as SalesStage | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 bg-white"
        >
          <option value="all">Tous les stages</option>
          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm text-sf-gray-5">{filtered.length} opportunité(s) — Total : <strong className="text-sf-gray-9">{formatAmount(total)}</strong></p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {([
                  { key: 'account', label: 'Compte' },
                  { key: null, label: 'Opportunité' },
                  { key: 'amount', label: 'Montant' },
                  { key: null, label: 'Quarter' },
                  { key: 'stage', label: 'Stage' },
                  { key: null, label: 'Produits' },
                  { key: null, label: 'Next Step' },
                ] as { key: SortKey | null; label: string }[]).map(({ key, label }) => (
                  <th
                    key={label}
                    className={`text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide ${key ? 'cursor-pointer hover:text-sf-gray-9 select-none' : ''}`}
                    onClick={key ? () => toggleSort(key) : undefined}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {key && <ArrowUpDown className="w-3 h-3 opacity-40" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-sf-gray-9 whitespace-nowrap">{o.account}</td>
                  <td className="px-4 py-3 text-sf-gray-6 max-w-[180px] truncate">{o.name}</td>
                  <td className="px-4 py-3 font-semibold text-sf-gray-9 whitespace-nowrap">{formatAmount(o.amount)}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium bg-blue-50 text-sf-blue px-2 py-0.5 rounded">{o.quarter} FY{o.fiscalYear}</span>
                  </td>
                  <td className="px-4 py-3">{stageBadge(o.stage)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {o.agentforceProducts?.slice(0, 2).map(p => (
                        <span key={p} className="text-xs bg-gray-100 text-sf-gray-6 px-1.5 py-0.5 rounded">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-sf-gray-5 max-w-[200px] truncate">{o.nextStep ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sf-gray-5">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>Aucune opportunité trouvée</p>
          </div>
        )}
      </div>
    </div>
  )
}
