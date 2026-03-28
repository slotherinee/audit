import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://trailway:trailway_dev_password@localhost:5432/trailway_dev',
})

export const db = drizzle(pool, { schema })

export type Database = typeof db

// Health check
export async function healthCheck() {
  try {
    await db.execute('SELECT 1')
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}
