export type Event = {
  id: string
  projectId: string
  action: string
  actor: string
  target?: string
  metadata?: Record<string, any>
  ip?: string
  userAgent?: string
  timestamp: string
  createdAt: string
}

export type EventFilters = {
  projectId: string
  action?: string
  actor?: string
  from?: string
  to?: string
  limit?: number
  offset?: number
}
