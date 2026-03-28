import { Elysia, t } from 'elysia'
import { sessionMiddleware } from '@/modules/middlewares/auth'
import {
  handleCreateProject,
  handleGetProjects,
  handleDeleteProject,
  handleGenerateApiKey,
  handleGetProjectApiKeys,
  handleDeleteApiKey,
} from './handler'

const projectsRouter = new Elysia({ prefix: '/projects' })
  .use(sessionMiddleware)

projectsRouter.get('/', async ({ user }) => {
  const projects = await handleGetProjects(user.id)
  return { data: projects }
})

projectsRouter.post(
  '/',
  async ({ body, user, set }) => {
    const project = await handleCreateProject(user.id, body.name)
    set.status = 201
    return project
  },
  { body: t.Object({ name: t.String({ minLength: 1 }) }) }
)

projectsRouter.delete('/:id', async ({ params, user, set }) => {
  try {
    const project = await handleDeleteProject(params.id, user.id)
    return project
  } catch {
    set.status = 404
    return { error: 'Project not found' }
  }
})

projectsRouter.get('/:id/keys', async ({ params, user, set }) => {
  try {
    const keys = await handleGetProjectApiKeys(params.id, user.id)
    return { data: keys }
  } catch {
    set.status = 404
    return { error: 'Project not found' }
  }
})

projectsRouter.post(
  '/:id/keys',
  async ({ params, body, user, set }) => {
    try {
      const apiKey = await handleGenerateApiKey(params.id, body.name)
      set.status = 201
      return apiKey
    } catch {
      set.status = 404
      return { error: 'Project not found' }
    }
  },
  { body: t.Object({ name: t.String({ minLength: 1 }) }) }
)

projectsRouter.delete('/:id/keys/:keyId', async ({ params, user, set }) => {
  try {
    await handleDeleteApiKey(params.keyId, params.id, user.id)
    return { success: true }
  } catch {
    set.status = 404
    return { error: 'API key or project not found' }
  }
})

export default projectsRouter
