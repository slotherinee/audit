import {
  insertEvent,
  incrementEventCount,
  fetchEvents,
  fetchEventCount,
} from './repository'
import type { CreateEventInput, GetEventsInput, Event } from '@/modules/types/events'

export async function createEvent(input: CreateEventInput): Promise<Event> {
  const eventTimestamp = input.timestamp || new Date()
  const currentMonth = eventTimestamp.toISOString().slice(0, 7)

  const event = await insertEvent({
    projectId: input.projectId,
    action: input.action,
    actor: input.actor,
    target: input.target,
    metadata: input.metadata || {},
    ip: input.ip,
    userAgent: input.userAgent,
    timestamp: eventTimestamp,
  })

  await incrementEventCount(input.projectId, currentMonth)

  return event
}

export async function getEvents(input: GetEventsInput): Promise<Event[]> {
  const limit = Math.min(input.limit || 50, 1000)
  const offset = input.offset || 0

  return await fetchEvents({
    projectId: input.projectId,
    action: input.action,
    actor: input.actor,
    from: input.from,
    to: input.to,
    limit,
    offset,
  })
}

export async function getEventCount(projectId: string): Promise<number> {
  const currentMonth = new Date().toISOString().slice(0, 7)
  return await fetchEventCount(projectId, currentMonth)
}
