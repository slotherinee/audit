import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://trailway:trailway_dev_password@localhost:5432/trailway_dev',
  },
  verbose: true,
  strict: true,
})
