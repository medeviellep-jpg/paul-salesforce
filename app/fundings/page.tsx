'use client'

import { useState } from 'react'
import { fundings, opportunities, formatAmount } from '@/lib/mock-data'
import { fundingStatusBadge } from '@/components/Badge'
import { Wallet, Search, DollarSign, CheckCircle, Clock, FileText } from 'lucide-react'
import type { FundingType, FundingStatus } from '@/lib/types'

export default function FundingsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<FundingType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<FundingStatus | 'all'>('all')

  const filtered = fundings.filter(f => {
    if (search && !f.account.toLowerCase().includes(search.toLowerCase()) && !f.name.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter !== 'all' && f.type !== typeFilter) return false
    if (statusFilter !== 'all' && f.status !== statusFilter) return false
    return true
  })

  const approved = fundings.filter(f => f.status === 'approved').reduce((s, f) => s + f.amount, 0)
  const submitted = fundings.filter(f => f.status === 'submitted').reduce((s, f) => s + f.amount, 0)
  const draft = fundings.filter(f => f.status === 'draft').reduce((s, f) => s + f.amount, 0)
  const catalystTotal = fundings.filter(f => f.type === 'Catalyst').reduce((s, f) => s + f.amount, 0)
  const sipTotal = fundings.filter(f => f.type === 'SIP').reduce((s, f) => s + f.amount, 0)

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-sf-gray-9">Catalyst & SIP</h1>
        <p className="text-sf-gray-5 text-sm mt-0.5">Suivi des fundings accordés et en cours de demande</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-green-500 p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-xs font-semibold text-sf-gray-5 uppercase">Approuvés</p>
          </div>
          <p className="text-2xl font-bold text-sf-gray-9">{formatAmount(approved)}</p>
          <p className="text-xs text-sf-gray-5 mt-0.5">{fundings.filter(f => f.status === 'approved').length} funding(s)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-blue-500 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-sf-blue" />
            <p className="text-xs font-semibold text-sf-gray-5 uppercase">En attente</p>
          </div>
          <p className="text-2xl font-bold text-sf-gray-9">{formatAmount(submitted)}</p>
          <p className="text-xs text-sf-gray-5 mt-0.5">{fundings.filter(f => f.status === 'submitted').length} soumis</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-blue-400 p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-semibold text-sf-gray-5 uppercase">Catalyst</p>
          </div>
          <p className="text-2xl font-bold text-sf-gray-9">{formatAmount(catalystTotal)}</p>
          <p className="text-xs text-sf-gray-5 mt-0.5">{fundings.filter(f => f.type === 'Catalyst').length} dossiers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-purple-500 p-4">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-purple-600" />
            <p className="text-xs font-semibold text-sf-gray-5 uppercase">SIP</p>
          </div>
          <p className="text-2xl font-bold text-sf-gray-9">{formatAmount(sipTotal)}</p>
          <p className="text-xs text-sf-gray-5 mt-0.5">{fundings.filter(f => f.type === 'SIP').length} dossiers</p>
        </div>
      </div>

      {/* Pipeline total avec fundings */}
      <div className="bg-sf-navy rounded-xl p-5 text-white">
        <h2 className="font-semibold mb-3">Tableau de bord Fundings</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-white/50 uppercase">Approuvés</p>
            <p className="text-xl font-bold">{formatAmount(approved)}</p>
            <div className="mt-1 h-1.5 bg-white/20 rounded-full">
              <div className="h-1.5 bg-green-400 rounded-full" style={{ width: `${(approved / (approved + submitted + draft)) * 100}%` }} />
            </div>
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase">Soumis</p>
            <p className="text-xl font-bold">{formatAmount(submitted)}</p>
            <div className="mt-1 h-1.5 bg-white/20 rounded-full">
              <div className="h-1.5 bg-blue-300 rounded-full" style={{ width: `${(submitted / (approved + submitted + draft)) * 100}%` }} />
            </div>
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase">Draft</p>
            <p className="text-xl font-bold">{formatAmount(draft)}</p>
            <div className="mt-1 h-1.5 bg-white/20 rounded-full">
              <div className="h-1.5 bg-white/40 rounded-full" style={{ width: `${(draft / (approved + submitted + draft)) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un compte ou funding..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 focus:border-sf-blue"
          />
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as FundingType | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 bg-white"
        >
          <option value="all">Catalyst & SIP</option>
          <option value="Catalyst">Catalyst uniquement</option>
          <option value="SIP">SIP uniquement</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as FundingStatus | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 bg-white"
        >
          <option value="all">Tous les statuts</option>
          <option value="approved">Approuvé</option>
          <option value="submitted">Soumis</option>
          <option value="draft">Draft</option>
          <option value="rejected">Refusé</option>
          <option value="used">Utilisé</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(f => {
          const linkedOpp = f.opportunityId ? opportunities.find(o => o.id === f.opportunityId) : null
          return (
            <div key={f.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${f.type === 'Catalyst' ? 'bg-blue-100 text-sf-blue' : 'bg-purple-100 text-purple-700'}`}>
                      {f.type}
                    </span>
                    {fundingStatusBadge(f.status)}
                  </div>
                  <h3 className="font-semibold text-sf-gray-9">{f.name}</h3>
                  <p className="text-sm text-sf-gray-5">{f.account}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-sf-gray-9">{formatAmount(f.amount)}</p>
                  {f.quarter && <p className="text-xs text-sf-gray-5">{f.quarter} FY27</p>}
                </div>
              </div>

              {f.useCase && (
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-sf-gray-5 mb-0.5">Use Case</p>
                  <p className="text-sm text-sf-gray-7">{f.useCase}</p>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-3 text-xs text-sf-gray-5">
                {f.dateSubmitted && (
                  <span>Soumis le {new Date(f.dateSubmitted).toLocaleDateString('fr')}</span>
                )}
                {f.dateApproved && (
                  <span className="text-green-600 font-medium">
                    ✓ Approuvé le {new Date(f.dateApproved).toLocaleDateString('fr')}
                  </span>
                )}
              </div>

              {linkedOpp && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-sf-blue flex-shrink-0" />
                  <span className="text-xs text-sf-gray-6 truncate">{linkedOpp.name}</span>
                  <span className="text-xs font-semibold text-sf-gray-9 ml-auto flex-shrink-0">{formatAmount(linkedOpp.amount)}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sf-gray-5">
          <Wallet className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p>Aucun funding trouvé</p>
        </div>
      )}
    </div>
  )
}
