import { Elysia } from 'elysia'
import { auth } from '@/modules/auth'

export const sessionMiddleware = (app: Elysia) =>
  app.derive(async ({ request, set }) => {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session?.user) {
      set.status = 401
      throw new Error('Unauthorized')
    }

    return { user: session.user }
  })
