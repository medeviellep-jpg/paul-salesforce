import clsx from 'clsx'

type Variant = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'teal' | 'gray' | 'navy'

const variants: Record<Variant, string> = {
  blue:   'bg-blue-100 text-blue-800',
  green:  'bg-green-100 text-green-800',
  yellow: 'bg-amber-100 text-amber-800',
  red:    'bg-red-100 text-red-800',
  purple: 'bg-purple-100 text-purple-800',
  teal:   'bg-teal-100 text-teal-800',
  gray:   'bg-gray-100 text-gray-600',
  navy:   'bg-[#032D60] text-white',
}

export default function Badge({
  children,
  variant = 'gray',
  className,
}: {
  children: React.ReactNode
  variant?: Variant
  className?: string
}) {
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}

export function stageBadge(stage: string) {
  if (stage.includes('7')) return <Badge variant="green">Closed Won</Badge>
  if (stage.includes('8')) return <Badge variant="red">Closed Lost</Badge>
  if (stage.includes('6')) return <Badge variant="purple">Negotiation</Badge>
  if (stage.includes('5')) return <Badge variant="blue">Value Prop</Badge>
  if (stage.includes('4')) return <Badge variant="teal">Proposal</Badge>
  if (stage.includes('3')) return <Badge variant="yellow">Discovery</Badge>
  if (stage.includes('2')) return <Badge variant="gray">Qualification</Badge>
  return <Badge variant="gray">Prospecting</Badge>
}

export function prepBadge(prep: string) {
  if (prep === 'ready') return <Badge variant="green">Prêt</Badge>
  if (prep === 'in_progress') return <Badge variant="yellow">En cours</Badge>
  return <Badge variant="gray">Non démarré</Badge>
}

export function statusBadge(status: string) {
  if (status === 'completed') return <Badge variant="green">Terminé</Badge>
  if (status === 'scheduled') return <Badge variant="blue">Planifié</Badge>
  if (status === 'cancelled') return <Badge variant="red">Annulé</Badge>
  if (status === 'postponed') return <Badge variant="yellow">Reporté</Badge>
  return <Badge variant="gray">{status}</Badge>
}

export function fundingStatusBadge(status: string) {
  if (status === 'approved') return <Badge variant="green">Approuvé</Badge>
  if (status === 'submitted') return <Badge variant="blue">Soumis</Badge>
  if (status === 'draft') return <Badge variant="gray">Draft</Badge>
  if (status === 'rejected') return <Badge variant="red">Refusé</Badge>
  if (status === 'used') return <Badge variant="teal">Utilisé</Badge>
  return <Badge variant="gray">{status}</Badge>
}

export function bigBetStatusBadge(status: string) {
  if (status === 'on_track') return <Badge variant="green">On Track</Badge>
  if (status === 'at_risk') return <Badge variant="yellow">At Risk</Badge>
  if (status === 'off_track') return <Badge variant="red">Off Track</Badge>
  if (status === 'completed') return <Badge variant="teal">Terminé</Badge>
  return <Badge variant="gray">{status}</Badge>
}

export function meetingTypeBadge(type: string) {
  const map: Record<string, Variant> = {
    SIC: 'navy',
    Demo: 'blue',
    QBR: 'purple',
    Discovery: 'teal',
    POV: 'yellow',
    EBC: 'red',
    'Executive Briefing': 'red',
    Workshop: 'green',
    Negotiation: 'purple',
  }
  return <Badge variant={map[type] ?? 'gray'}>{type}</Badge>
}
