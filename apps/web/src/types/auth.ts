export type User = {
  id: string
  email: string
  name?: string
  image?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type Session = {
  user: User
  expires: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  email: string
  password: string
  name?: string
}
