import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'teal' | 'red'
}

const colors = {
  blue:   { icon: 'bg-blue-100 text-sf-blue', border: 'border-l-sf-blue' },
  green:  { icon: 'bg-green-100 text-green-700', border: 'border-l-green-600' },
  yellow: { icon: 'bg-amber-100 text-amber-700', border: 'border-l-amber-500' },
  purple: { icon: 'bg-purple-100 text-purple-700', border: 'border-l-purple-600' },
  teal:   { icon: 'bg-teal-100 text-teal-700', border: 'border-l-teal-600' },
  red:    { icon: 'bg-red-100 text-red-700', border: 'border-l-red-600' },
}

export default function KPICard({ title, value, subtitle, icon: Icon, trend, color = 'blue' }: KPICardProps) {
  const c = colors[color]
  return (
    <div className={clsx('bg-white rounded-xl p-5 shadow-sm border border-gray-200 border-l-4', c.border)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-sf-gray-5 uppercase tracking-wide truncate">{title}</p>
          <p className="text-2xl font-bold text-sf-gray-9 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-sf-gray-5 mt-0.5">{subtitle}</p>}
          {trend && (
            <p className={clsx('text-xs mt-1 font-medium', trend.positive ? 'text-green-600' : 'text-red-600')}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3', c.icon)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
