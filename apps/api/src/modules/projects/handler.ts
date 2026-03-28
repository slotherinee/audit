import {
  createProject,
  getUserProjects,
  deleteProject,
  generateApiKey,
  getProjectApiKeys,
  deleteApiKey,
} from './service'
import type { Project, ApiKeyResponse, ApiKeyItem } from '@/modules/types/projects'

export async function handleCreateProject(
  userId: string,
  name: string
): Promise<Project> {
  return await createProject(userId, name)
}

export async function handleGetProjects(userId: string): Promise<Project[]> {
  return await getUserProjects(userId)
}

export async function handleDeleteProject(projectId: string, userId: string): Promise<Project> {
  return await deleteProject(projectId, userId)
}

export async function handleGenerateApiKey(projectId: string, keyName: string): Promise<ApiKeyResponse> {
  return await generateApiKey(projectId, keyName)
}

export async function handleGetProjectApiKeys(projectId: string, userId: string): Promise<ApiKeyItem[]> {
  return await getProjectApiKeys(projectId, userId)
}

export async function handleDeleteApiKey(keyId: string, projectId: string, userId: string): Promise<{ id: string; name: string; keyPrefix: string }> {
  return await deleteApiKey(keyId, projectId, userId)
}
