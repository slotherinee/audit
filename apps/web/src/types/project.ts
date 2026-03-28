export type Project = {
  id: string
  userId: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type ApiKey = {
  id: string
  projectId: string
  name: string
  keyPrefix: string
  lastUsedAt?: string
  createdAt: string
}

export type ApiKeyResponse = {
  id: string
  key: string
  prefix: string
  name: string
}
