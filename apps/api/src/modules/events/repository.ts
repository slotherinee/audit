import { db } from '@/infra/db'
import { events, eventCounts } from '@/infra/db/schema'
import { and, eq, gte, lte, desc } from 'drizzle-orm'
import type { InsertEventInput, FetchEventsInput } from '@/modules/types/events'

export async function insertEvent(data: InsertEventInput) {
  const [event] = await db.insert(events).values(data).returning()
  return event
}

export async function incrementEventCount(
  projectId: string,
  month: string
) {
  const [existing] = await db
    .select()
    .from(eventCounts)
    .where(
      and(
        eq(eventCounts.projectId, projectId),
        eq(eventCounts.month, month)
      )
    )
    .limit(1)

  if (existing) {
    return await db
      .update(eventCounts)
      .set({ count: existing.count + 1 })
      .where(eq(eventCounts.id, existing.id))
      .returning()
  } else {
    const [created] = await db
      .insert(eventCounts)
      .values({
        projectId,
        month,
        count: 1,
      })
      .returning()
    return [created]
  }
}

export async function fetchEvents(input: FetchEventsInput) {
  const conditions = [eq(events.projectId, input.projectId)]

  if (input.action) conditions.push(eq(events.action, input.action))
  if (input.actor) conditions.push(eq(events.actor, input.actor))
  if (input.from) conditions.push(gte(events.timestamp, input.from))
  if (input.to) conditions.push(lte(events.timestamp, input.to))

  return await db
    .select()
    .from(events)
    .where(and(...conditions))
    .orderBy(desc(events.timestamp))
    .limit(input.limit)
    .offset(input.offset)
}

export async function fetchEventCount(projectId: string, month: string) {
  const [result] = await db
    .select()
    .from(eventCounts)
    .where(
      and(
        eq(eventCounts.projectId, projectId),
        eq(eventCounts.month, month)
      )
    )
    .limit(1)

  return result?.count || 0
}
