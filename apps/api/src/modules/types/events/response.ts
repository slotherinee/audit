import type { events } from '@/infra/db/schema'

export type Event = typeof events.$inferSelect

export type EventCount = {
  count: number
}
