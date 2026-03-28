export type CreateEventInput = {
  projectId: string
  action: string
  actor: string
  target?: string
  metadata?: Record<string, any>
  ip?: string
  userAgent?: string
  timestamp?: Date
}

export type GetEventsInput = {
  projectId: string
  action?: string
  actor?: string
  from?: Date
  to?: Date
  limit?: number
  offset?: number
}

export type CreateEventHandlerInput = {
  projectId: string
  action: string
  actor: string
  target?: string
  metadata?: Record<string, any>
  ip?: string
  userAgent?: string
  timestamp?: string
}

export type GetEventsHandlerInput = {
  projectId: string
  action?: string
  actor?: string
  from?: string
  to?: string
  limit?: number
  offset?: number
}

export type InsertEventInput = {
  projectId: string
  action: string
  actor: string
  target?: string
  metadata?: Record<string, any>
  ip?: string
  userAgent?: string
  timestamp: Date
}

export type FetchEventsInput = {
  projectId: string
  action?: string
  actor?: string
  from?: Date
  to?: Date
  limit: number
  offset: number
}
