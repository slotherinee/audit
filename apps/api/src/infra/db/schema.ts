import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  jsonb,
  unique,
  index,
  boolean,
  text,
} from 'drizzle-orm/pg-core'

export const plans = pgTable('plans', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  priceMonthly: integer('price_monthly').notNull(),
  eventsLimit: integer('events_limit').notNull(),
  retentionDays: integer('retention_days').notNull(),
  projectsLimit: integer('projects_limit').notNull(),
})

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: varchar('user_agent', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  planId: varchar('plan_id').references(() => plans.id).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  robokassaSubscriptionId: varchar('robokassa_subscription_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const apiKeys = pgTable(
  'api_keys',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    keyHash: varchar('key_hash', { length: 255 }).notNull().unique(),
    keyPrefix: varchar('key_prefix', { length: 20 }).notNull(),
    lastUsedAt: timestamp('last_used_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    projectIdIdx: index('api_keys_project_id_idx').on(table.projectId),
  })
)

export const events = pgTable(
  'events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    action: varchar('action', { length: 255 }).notNull(),
    actor: varchar('actor', { length: 255 }).notNull(),
    target: varchar('target', { length: 255 }),
    metadata: jsonb('metadata').default({}),
    ip: varchar('ip', { length: 45 }),
    userAgent: varchar('user_agent', { length: 500 }),
    timestamp: timestamp('timestamp').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    projectTimestampIdx: index('events_project_timestamp_idx').on(
      table.projectId,
      table.timestamp
    ),
    projectActionIdx: index('events_project_action_idx').on(
      table.projectId,
      table.action
    ),
    projectActorIdx: index('events_project_actor_idx').on(
      table.projectId,
      table.actor
    ),
  })
)

export const eventCounts = pgTable(
  'event_counts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    month: varchar('month', { length: 7 }).notNull(),
    count: integer('count').notNull().default(0),
  },
  (table) => ({
    projectMonthUnique: unique().on(table.projectId, table.month),
  })
)

export const rateLimitAlerts = pgTable('rate_limit_alerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id).notNull(),
  month: varchar('month', { length: 7 }).notNull(),
  alertSentAt: timestamp('alert_sent_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
