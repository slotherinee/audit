import type { PlaygroundEvent } from '~/types'

export const SAMPLE_EVENTS: PlaygroundEvent[] = [
  {
    id: '1',
    action: 'user.created',
    actor: 'admin_1',
    target: 'user_123',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: '2',
    action: 'user.password_changed',
    actor: 'user_123',
    target: 'user_123',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: '3',
    action: 'subscription.upgraded',
    actor: 'stripe_webhook',
    target: 'user_123',
    timestamp: new Date().toISOString(),
  },
]
