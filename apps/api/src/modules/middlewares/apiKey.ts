import { Elysia } from 'elysia'
import { db } from '@/infra/db'
import { apiKeys, projects, subscriptions, plans, eventCounts } from '@/infra/db/schema'
import { and, eq } from 'drizzle-orm'
import crypto from 'crypto'

export const apiKeyMiddleware = (app: Elysia) =>
  app.derive(async ({ request, set }) => {
    const authHeader = request.headers.get('authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      set.status = 401
      throw new Error('Missing authorization')
    }

    const token = authHeader.slice(7)
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

    const [apiKey] = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.keyHash, tokenHash))
      .limit(1)

    if (!apiKey) {
      set.status = 401
      throw new Error('Invalid API key')
    }

    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, apiKey.projectId))
      .limit(1)

    if (!project) {
      set.status = 404
      throw new Error('Project not found')
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, project.userId))
      .limit(1)

    if (!subscription || subscription.status !== 'active') {
      set.status = 403
      throw new Error('Subscription inactive')
    }

    const [plan] = await db
      .select()
      .from(plans)
      .where(eq(plans.id, subscription.planId))
      .limit(1)

    if (!plan) {
      set.status = 500
      throw new Error('Plan not found')
    }

    const currentMonth = new Date().toISOString().slice(0, 7)
    const [eventCount] = await db
      .select()
      .from(eventCounts)
      .where(
        and(
          eq(eventCounts.projectId, project.id),
          eq(eventCounts.month, currentMonth)
        )
      )
      .limit(1)

    const eventsThisMonth = eventCount?.count || 0

    if (eventsThisMonth >= plan.eventsLimit) {
      set.status = 429
      throw new Error('Event limit exceeded')
    }

    await db
      .update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.id, apiKey.id))

    return { apiKey, project, subscription, plan, eventsThisMonth }
  })
