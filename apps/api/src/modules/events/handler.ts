import { createEvent, getEvents, getEventCount } from './service'
import type {
  CreateEventHandlerInput,
  GetEventsHandlerInput,
  Event,
} from '@/modules/types/events'

export async function handleCreateEvent(input: CreateEventHandlerInput): Promise<Event> {
  return await createEvent({
    projectId: input.projectId,
    action: input.action,
    actor: input.actor,
    target: input.target,
    metadata: input.metadata,
    ip: input.ip,
    userAgent: input.userAgent,
    timestamp: input.timestamp ? new Date(input.timestamp) : new Date(),
  })
}

export async function handleGetEvents(input: GetEventsHandlerInput): Promise<Event[]> {
  return await getEvents({
    projectId: input.projectId,
    action: input.action,
    actor: input.actor,
    from: input.from ? new Date(input.from) : undefined,
    to: input.to ? new Date(input.to) : undefined,
    limit: input.limit || 50,
    offset: input.offset || 0,
  })
}

export async function handleGetEventCount(projectId: string): Promise<number> {
  return await getEventCount(projectId)
}
