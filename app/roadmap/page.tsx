import { bigBets, opportunities, formatAmount } from '@/lib/mock-data'
import { bigBetStatusBadge, stageBadge } from '@/components/Badge'
import { Target, TrendingUp, AlertTriangle } from 'lucide-react'

const categoryColor: Record<string, string> = {
  'Financial Services': 'border-l-blue-500',
  'Retail & Commerce': 'border-l-teal-500',
  'Manufacturing & Energy': 'border-l-amber-500',
  'Telco & Media': 'border-l-purple-500',
  'Public Sector': 'border-l-green-500',
  'Health & Life Sciences': 'border-l-red-500',
}

const categoryIcon: Record<string, string> = {
  'Financial Services': '🏦',
  'Retail & Commerce': '🛍️',
  'Manufacturing & Energy': '⚡',
  'Telco & Media': '📡',
  'Public Sector': '🏛️',
  'Health & Life Sciences': '💊',
}

export default function RoadmapPage() {
  const totalTarget = bigBets.reduce((s, bb) => s + bb.targetRevenue, 0)
  const totalCurrent = bigBets.reduce((s, bb) => s + bb.currentRevenue, 0)
  const atRiskBets = bigBets.filter(bb => bb.status === 'at_risk' || bb.status === 'off_track')

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-sf-gray-9">Big Bets & Roadmap</h1>
        <p className="text-sf-gray-5 text-sm mt-0.5">Initiatives stratégiques FY27 croisées avec le pipeline</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-semibold text-sf-gray-5 uppercase">Objectif Global Big Bets</p>
          <p className="text-2xl font-bold text-sf-gray-9 mt-1">{formatAmount(totalTarget)}</p>
          <div className="mt-2 bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full bg-sf-blue" style={{ width: `${Math.min((totalCurrent / totalTarget) * 100, 100)}%` }} />
          </div>
          <p className="text-xs text-sf-gray-5 mt-1">{formatAmount(totalCurrent)} atteint ({Math.round((totalCurrent / totalTarget) * 100)}%)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-semibold text-sf-gray-5 uppercase">Big Bets</p>
          <p className="text-2xl font-bold text-sf-gray-9 mt-1">{bigBets.length}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
              {bigBets.filter(b => b.status === 'on_track').length} on track
            </span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">
              {bigBets.filter(b => b.status === 'at_risk').length} at risk
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-semibold text-sf-gray-5 uppercase">Opportunités liées</p>
          <p className="text-2xl font-bold text-sf-gray-9 mt-1">
            {bigBets.reduce((s, bb) => s + bb.opportunityIds.length, 0)}
          </p>
          <p className="text-xs text-sf-gray-5 mt-1">
            {formatAmount(bigBets.reduce((s, bb) => {
              const opps = bb.opportunityIds.map(id => opportunities.find(o => o.id === id)).filter(Boolean)
              return s + opps.reduce((ss, o) => ss + (o?.amount ?? 0), 0)
            }, 0))} total associé
          </p>
        </div>
      </div>

      {/* Alert */}
      {atRiskBets.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              {atRiskBets.length} big bet(s) à risque : {atRiskBets.map(b => b.name).join(', ')}
            </p>
            <p className="text-xs text-amber-700 mt-0.5">Vérifier le pipeline associé et les actions en cours</p>
          </div>
        </div>
      )}

      {/* Big Bets Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {bigBets.map(bb => {
          const pct = Math.round((bb.currentRevenue / bb.targetRevenue) * 100)
          const linkedOpps = bb.opportunityIds
            .map(id => opportunities.find(o => o.id === id))
            .filter(Boolean)

          return (
            <div key={bb.id} className={`bg-white rounded-xl border border-gray-200 border-l-4 ${categoryColor[bb.category] ?? 'border-l-gray-300'} shadow-sm`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{categoryIcon[bb.category] ?? '📌'}</span>
                    <div>
                      <h3 className="font-semibold text-sf-gray-9">{bb.name}</h3>
                      <p className="text-xs text-sf-gray-5">{bb.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {bigBetStatusBadge(bb.status)}
                    <span className="text-xs text-sf-gray-5">
                      {bb.quarters.join(', ')} FY27
                    </span>
                  </div>
                </div>

                <p className="text-sm text-sf-gray-6 mt-3 leading-relaxed">{bb.description}</p>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-sf-gray-5 mb-1">
                    <span>Progression revenue</span>
                    <span>{pct}% ({formatAmount(bb.currentRevenue)} / {formatAmount(bb.targetRevenue)})</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${pct >= 50 ? 'bg-green-500' : pct >= 25 ? 'bg-amber-400' : 'bg-red-400'}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Key accounts */}
                <div className="mt-3">
                  <p className="text-xs font-medium text-sf-gray-5 mb-1">Comptes clés</p>
                  <div className="flex flex-wrap gap-1">
                    {bb.keyAccounts.map(a => (
                      <span key={a} className="text-xs bg-gray-100 text-sf-gray-6 px-2 py-0.5 rounded">{a}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Linked opportunities */}
              {linkedOpps.length > 0 && (
                <div className="border-t border-gray-100 p-4">
                  <p className="text-xs font-semibold text-sf-gray-5 uppercase mb-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Opportunités liées ({linkedOpps.length})
                  </p>
                  <div className="space-y-2">
                    {linkedOpps.map(o => o && (
                      <div key={o.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-medium text-sf-gray-9 truncate">{o.account}</span>
                          <span className="text-xs text-sf-blue bg-blue-50 px-1.5 py-0.5 rounded flex-shrink-0">{o.quarter}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {stageBadge(o.stage)}
                          <span className="text-xs font-semibold text-sf-gray-9">{formatAmount(o.amount)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
