import {
  insertProject,
  fetchUserProjects,
  fetchProject,
  deleteProjectRecord,
  insertApiKey,
  fetchProjectApiKeys,
  fetchApiKey,
  deleteApiKeyRecord,
} from './repository'
import type { Project, ApiKeyResponse, ApiKeyItem } from '@/modules/types/projects'
import crypto from 'crypto'

export async function createProject(userId: string, name: string): Promise<Project> {
  return await insertProject({ userId, name })
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  return await fetchUserProjects(userId)
}

export async function deleteProject(projectId: string, userId: string): Promise<Project> {
  const project = await fetchProject(projectId, userId)
  if (!project) throw new Error('Project not found')

  await deleteProjectRecord(projectId)
  return project
}

export async function generateApiKey(projectId: string, keyName: string): Promise<ApiKeyResponse> {
  const token = `tw_live_${crypto.randomBytes(24).toString('hex')}`
  const apiKey = await insertApiKey({ projectId, name: keyName, token })

  return {
    id: apiKey.id,
    key: apiKey.token,
    prefix: apiKey.keyPrefix,
    name: apiKey.name,
  }
}

export async function getProjectApiKeys(projectId: string, userId: string): Promise<ApiKeyItem[]> {
  const project = await fetchProject(projectId, userId)
  if (!project) throw new Error('Project not found')

  return await fetchProjectApiKeys(projectId)
}

export async function deleteApiKey(
  keyId: string,
  projectId: string,
  userId: string
): Promise<{ id: string; name: string; keyPrefix: string }> {
  const project = await fetchProject(projectId, userId)
  if (!project) throw new Error('Project not found')

  const key = await fetchApiKey(keyId, projectId)
  if (!key) throw new Error('API key not found')

  await deleteApiKeyRecord(keyId)
  return key
}
