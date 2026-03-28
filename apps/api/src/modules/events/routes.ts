import { Elysia, t } from 'elysia'
import { apiKeyMiddleware } from '@/modules/middlewares/apiKey'
import {
  handleCreateEvent,
  handleGetEvents,
  handleGetEventCount,
} from './handler'

const eventsRouter = new Elysia({ prefix: '/v1' })
  .use(apiKeyMiddleware)

eventsRouter.post(
  '/events',
  async ({ body, set, project, plan, eventsThisMonth }) => {
    if (eventsThisMonth >= plan.eventsLimit) {
      set.status = 429
      return { error: 'Event limit exceeded' }
    }

    const event = await handleCreateEvent({
      projectId: project.id,
      action: body.action,
      actor: body.actor,
      target: body.target,
      metadata: body.metadata,
      ip: body.ip,
      userAgent: body.userAgent,
      timestamp: body.timestamp,
    })

    set.status = 201
    return { id: event.id, timestamp: event.timestamp }
  },
  {
    body: t.Object({
      action: t.String(),
      actor: t.String(),
      target: t.Optional(t.String()),
      metadata: t.Optional(t.Record(t.String(), t.Any())),
      ip: t.Optional(t.String()),
      userAgent: t.Optional(t.String()),
      timestamp: t.Optional(t.String()),
    }),
  }
)

eventsRouter.get(
  '/events',
  async ({ query, project }) => {
    const results = await handleGetEvents({
      projectId: project.id,
      action: query.action,
      actor: query.actor,
      from: query.from,
      to: query.to,
      limit: query.limit ? parseInt(query.limit) : 50,
      offset: query.offset ? parseInt(query.offset) : 0,
    })

    return { data: results }
  },
  {
    query: t.Object({
      action: t.Optional(t.String()),
      actor: t.Optional(t.String()),
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      offset: t.Optional(t.String()),
    }),
  }
)

eventsRouter.get('/events/count', async ({ project }) => {
  const count = await handleGetEventCount(project.id)
  return { count }
})

export default eventsRouter
