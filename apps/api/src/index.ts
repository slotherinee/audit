import { Elysia } from 'elysia'
import { db, healthCheck } from '@/infra/db'
import { auth } from '@/modules/auth'
import eventsRouter from '@/modules/events/routes'
import projectsRouter from '@/modules/projects/routes'

const app = new Elysia()

app.get('/health', async () => ({
  status: 'ok',
  database: (await healthCheck()) ? 'connected' : 'disconnected',
}))

app.get('/status', () => ({
  version: '0.0.1',
  environment: process.env.NODE_ENV || 'development',
  timestamp: new Date().toISOString(),
}))

app.all('/api/auth/**', ({ request }) => auth.handler(request))

app.use(eventsRouter)
app.use(projectsRouter)

app.onError(({ code, set }) => {
  if (code === 'NOT_FOUND') {
    set.status = 404
    return { status: 404, message: 'Not Found' }
  }
  set.status = 500
  return { status: 500, message: 'Internal Server Error' }
})

const port = parseInt(process.env.API_PORT || '3000', 10)
const host = process.env.API_HOST || '0.0.0.0'

app.listen({ port, hostname: host }, () => {
  console.log(`🚀 API listening on http://${host}:${port}`)
})

export default app
