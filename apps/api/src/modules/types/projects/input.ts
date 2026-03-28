export type CreateProjectInput = {
  userId: string
  name: string
}

export type GenerateApiKeyInput = {
  projectId: string
  keyName: string
}

export type GenerateApiKeyHandlerInput = {
  projectId: string
  name: string
}

export type InsertProjectInput = {
  userId: string
  name: string
}

export type InsertApiKeyInput = {
  projectId: string
  name: string
  token: string
}
