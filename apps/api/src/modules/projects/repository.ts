import { db } from '@/infra/db'
import { projects, apiKeys } from '@/infra/db/schema'
import { eq, and } from 'drizzle-orm'
import crypto from 'crypto'
import type { InsertProjectInput, InsertApiKeyInput } from '@/modules/types/projects'

export async function insertProject(input: InsertProjectInput) {
  const [project] = await db.insert(projects).values(input).returning()
  return project
}

export async function fetchUserProjects(userId: string) {
  return await db.select().from(projects).where(eq(projects.userId, userId))
}

export async function fetchProject(projectId: string, userId: string) {
  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .limit(1)
  return project
}

export async function deleteProjectRecord(projectId: string) {
  return await db.delete(projects).where(eq(projects.id, projectId))
}

export async function insertApiKey(input: InsertApiKeyInput) {
  const tokenHash = crypto.createHash('sha256').update(input.token).digest('hex')
  const keyPrefix = 'tw_live_' + input.token.slice(-8)

  const [apiKey] = await db
    .insert(apiKeys)
    .values({ projectId: input.projectId, name: input.name, keyHash: tokenHash, keyPrefix })
    .returning()

  return { ...apiKey, token: input.token }
}

export async function fetchProjectApiKeys(projectId: string) {
  return await db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      keyPrefix: apiKeys.keyPrefix,
      lastUsedAt: apiKeys.lastUsedAt,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .where(eq(apiKeys.projectId, projectId))
}

export async function fetchApiKey(keyId: string, projectId: string) {
  const [key] = await db
    .select()
    .from(apiKeys)
    .where(and(eq(apiKeys.id, keyId), eq(apiKeys.projectId, projectId)))
    .limit(1)
  return key
}

export async function deleteApiKeyRecord(keyId: string) {
  return await db.delete(apiKeys).where(eq(apiKeys.id, keyId))
}
