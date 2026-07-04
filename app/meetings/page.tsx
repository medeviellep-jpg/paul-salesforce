'use client'

import { useState } from 'react'
import { meetings } from '@/lib/mock-data'
import { meetingTypeBadge, prepBadge, statusBadge } from '@/components/Badge'
import { Calendar, Search, Filter, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import type { MeetingType, MeetingStatus, PreparationStatus } from '@/lib/types'

const TYPES: MeetingType[] = ['SIC', 'Demo', 'QBR', 'Discovery', 'POV', 'EBC', 'Executive Briefing', 'Workshop', 'Negotiation']

export default function MeetingsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<MeetingType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<MeetingStatus | 'all'>('all')
  const [prepFilter, setPrepFilter] = useState<PreparationStatus | 'all'>('all')

  const filtered = meetings
    .filter(m => {
      if (search && !m.account.toLowerCase().includes(search.toLowerCase()) && !m.title.toLowerCase().includes(search.toLowerCase())) return false
      if (typeFilter !== 'all' && m.type !== typeFilter) return false
      if (statusFilter !== 'all' && m.status !== statusFilter) return false
      if (prepFilter !== 'all' && m.preparation !== prepFilter) return false
      return true
    })
    .sort((a, b) => a.date.localeCompare(b.date))

  const notReady = meetings.filter(m => m.status === 'scheduled' && m.preparation === 'not_started').length
  const inProgress = meetings.filter(m => m.status === 'scheduled' && m.preparation === 'in_progress').length
  const ready = meetings.filter(m => m.status === 'scheduled' && m.preparation === 'ready').length

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-sf-gray-9">Meetings</h1>
        <p className="text-sf-gray-5 text-sm mt-0.5">Suivi des meetings clés par type et état de préparation</p>
      </div>

      {/* Prep summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-xl font-bold text-red-700">{notReady}</p>
            <p className="text-xs text-red-600">Non démarré</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-xl font-bold text-amber-700">{inProgress}</p>
            <p className="text-xs text-amber-600">En préparation</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-xl font-bold text-green-700">{ready}</p>
            <p className="text-xs text-green-600">Prêt</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un compte ou meeting..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 focus:border-sf-blue"
          />
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as MeetingType | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 bg-white"
        >
          <option value="all">Tous les types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as MeetingStatus | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 bg-white"
        >
          <option value="all">Tous les statuts</option>
          <option value="scheduled">Planifié</option>
          <option value="completed">Terminé</option>
          <option value="cancelled">Annulé</option>
        </select>
        <select
          value={prepFilter}
          onChange={e => setPrepFilter(e.target.value as PreparationStatus | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-blue/30 bg-white"
        >
          <option value="all">Toute préparation</option>
          <option value="not_started">Non démarré</option>
          <option value="in_progress">En cours</option>
          <option value="ready">Prêt</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide">Compte</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide hidden lg:table-cell">Titre</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide">Préparation</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sf-gray-5 uppercase tracking-wide hidden xl:table-cell">Lieu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium text-sf-gray-9">
                    {new Date(m.date).toLocaleDateString('fr', { day: '2-digit', month: 'short' })}
                  </span>
                </td>
                <td className="px-4 py-3">{meetingTypeBadge(m.type)}</td>
                <td className="px-4 py-3 font-medium text-sf-gray-9">{m.account}</td>
                <td className="px-4 py-3 text-sf-gray-6 hidden lg:table-cell max-w-[240px] truncate">{m.title}</td>
                <td className="px-4 py-3">{statusBadge(m.status)}</td>
                <td className="px-4 py-3">{prepBadge(m.preparation)}</td>
                <td className="px-4 py-3 text-sf-gray-5 hidden xl:table-cell">{m.location ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sf-gray-5">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>Aucun meeting trouvé</p>
          </div>
        )}
      </div>

      {/* Notes panel */}
      {filtered.some(m => m.notes) && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-sf-gray-9 mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4 text-sf-blue" /> Notes & Next Steps
          </h2>
          <div className="space-y-3">
            {filtered.filter(m => m.notes).map(m => (
              <div key={m.id} className="flex gap-3">
                <div className="min-w-[90px]">
                  <span className="text-xs font-semibold text-sf-gray-9">{m.account}</span>
                  <p className="text-xs text-sf-gray-5">
                    {new Date(m.date).toLocaleDateString('fr', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
                <p className="text-sm text-sf-gray-6 flex-1">{m.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
