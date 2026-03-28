import type { projects, apiKeys } from '@/infra/db/schema'

export type Project = typeof projects.$inferSelect

export type ApiKeyResponse = {
  id: string
  key: string
  prefix: string
  name: string
}

export type ApiKeyItem = Pick<
  typeof apiKeys.$inferSelect,
  'id' | 'name' | 'keyPrefix' | 'lastUsedAt' | 'createdAt'
>
