import { Elysia, t } from 'elysia'
import { db, healthCheck } from '@/db'

const app = new Elysia()

app.get('/health', async () => {
  const dbHealthy = await healthCheck()
  return {
    status: 'ok',
    database: dbHealthy ? 'connected' : 'disconnected',
  }
})

app.get('/status', () => ({
  version: '0.0.1',
  environment: process.env.NODE_ENV || 'development',
  timestamp: new Date().toISOString(),
}))

// 404 handler
app.onError(({ code, error }) => {
  if (code === 'NOT_FOUND') {
    return {
      status: 404,
      message: 'Not Found',
      path: error.message,
    }
  }
  console.error('Error:', error)
  return {
    status: 500,
    message: 'Internal Server Error',
  }
})

const port = parseInt(process.env.API_PORT || '3000', 10)
const host = process.env.API_HOST || '0.0.0.0'

app.listen({ port, hostname: host }, () => {
  console.log(`🚀 API listening on http://${host}:${port}`)
})

export default app
