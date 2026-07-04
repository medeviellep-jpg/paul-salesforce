export type MeetingType = 'SIC' | 'Demo' | 'QBR' | 'Discovery' | 'POV' | 'EBC' | 'Executive Briefing' | 'Workshop' | 'Negotiation'
export type MeetingStatus = 'scheduled' | 'completed' | 'cancelled' | 'postponed'
export type PreparationStatus = 'not_started' | 'in_progress' | 'ready'

export interface Meeting {
  id: string
  title: string
  type: MeetingType
  date: string
  account: string
  opportunityId?: string
  owner: string
  status: MeetingStatus
  preparation: PreparationStatus
  attendees?: string[]
  notes?: string
  location?: string
}

export type SalesStage =
  | '1 - Prospecting'
  | '2 - Qualification'
  | '3 - Discovery'
  | '4 - Proposal'
  | '5 - Value Proposition'
  | '6 - Negotiation'
  | '7 - Closed Won'
  | '8 - Closed Lost'

export type FiscalQuarter = 'Q1' | 'Q2' | 'Q3' | 'Q4'

export interface Opportunity {
  id: string
  name: string
  account: string
  amount: number
  closeDate: string
  quarter: FiscalQuarter
  fiscalYear: number
  stage: SalesStage
  type: string
  bigBetId?: string
  fundingIds?: string[]
  owner: string
  nextStep?: string
  agentforceProducts?: string[]
  probability?: number
}

export type BigBetCategory = 'Financial Services' | 'Retail & Commerce' | 'Manufacturing & Energy' | 'Telco & Media' | 'Public Sector' | 'Health & Life Sciences'
export type BigBetStatus = 'on_track' | 'at_risk' | 'off_track' | 'completed'
export type Priority = 'high' | 'medium' | 'low'

export interface BigBet {
  id: string
  name: string
  description: string
  category: BigBetCategory
  quarters: FiscalQuarter[]
  priority: Priority
  opportunityIds: string[]
  status: BigBetStatus
  owner: string
  targetRevenue: number
  currentRevenue: number
  keyAccounts: string[]
}

export type FundingType = 'Catalyst' | 'SIP'
export type FundingStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'used'

export interface Funding {
  id: string
  name: string
  type: FundingType
  amount: number
  currency: 'EUR' | 'USD'
  status: FundingStatus
  opportunityId?: string
  account: string
  dateSubmitted?: string
  dateApproved?: string
  owner: string
  notes?: string
  useCase?: string
  quarter?: FiscalQuarter
}
