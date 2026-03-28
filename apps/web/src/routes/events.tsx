import { createFileRoute } from '@tanstack/react-router'
import { Input, Button, Select, Typography, Tag, DatePicker } from 'antd'
import { SearchOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useState } from 'react'
import { PortalLayout } from '~/components/PortalLayout'

const { Text } = Typography

export const Route = createFileRoute('/events')({
  component: Events,
})

const MOCK_EVENTS = [
  { id: 'evt_1', action: 'user.login', actor: 'admin@acme.co', target: 'session_8f2a', ip: '192.168.1.1', timestamp: '2026-03-28T10:30:00Z', status: 'success' },
  { id: 'evt_2', action: 'document.updated', actor: 'jane@acme.co', target: 'doc_1234', ip: '10.0.0.5', timestamp: '2026-03-28T10:25:00Z', status: 'success' },
  { id: 'evt_3', action: 'api_key.created', actor: 'admin@acme.co', target: 'key_tw_live_abc', ip: '192.168.1.1', timestamp: '2026-03-28T10:18:00Z', status: 'success' },
  { id: 'evt_4', action: 'user.invited', actor: 'admin@acme.co', target: 'bob@acme.co', ip: '192.168.1.1', timestamp: '2026-03-28T09:55:00Z', status: 'success' },
  { id: 'evt_5', action: 'permission.changed', actor: 'jane@acme.co', target: 'role_editor', ip: '10.0.0.5', timestamp: '2026-03-28T09:30:00Z', status: 'warning' },
  { id: 'evt_6', action: 'export.started', actor: 'admin@acme.co', target: 'export_csv_q1', ip: '192.168.1.1', timestamp: '2026-03-28T08:45:00Z', status: 'success' },
  { id: 'evt_7', action: 'user.deleted', actor: 'admin@acme.co', target: 'user_42', ip: '192.168.1.1', timestamp: '2026-03-28T07:20:00Z', status: 'error' },
  { id: 'evt_8', action: 'project.created', actor: 'jane@acme.co', target: 'proj_new_app', ip: '10.0.0.5', timestamp: '2026-03-28T06:10:00Z', status: 'success' },
  { id: 'evt_9', action: 'billing.updated', actor: 'admin@acme.co', target: 'plan_pro', ip: '192.168.1.1', timestamp: '2026-03-27T22:00:00Z', status: 'success' },
  { id: 'evt_10', action: 'user.login', actor: 'bob@acme.co', target: 'session_a1b2', ip: '172.16.0.10', timestamp: '2026-03-27T20:15:00Z', status: 'success' },
  { id: 'evt_11', action: 'document.deleted', actor: 'jane@acme.co', target: 'doc_5678', ip: '10.0.0.5', timestamp: '2026-03-27T18:30:00Z', status: 'error' },
  { id: 'evt_12', action: 'webhook.failed', actor: 'system', target: 'wh_notify_slack', ip: '—', timestamp: '2026-03-27T16:45:00Z', status: 'error' },
]

function Events() {
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = MOCK_EVENTS.filter(
    (e) =>
      e.action.includes(search.toLowerCase()) ||
      e.actor.includes(search.toLowerCase()) ||
      e.target.includes(search.toLowerCase())
  )

  return (
    <PortalLayout>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>
              Events
            </h1>
            <Text style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
              Browse and search your audit trail
            </Text>
          </div>
          <Button icon={<DownloadOutlined />} style={{ borderRadius: 10, fontWeight: 500 }}>
            Export CSV
          </Button>
        </div>

        {/* Search & filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          style={{ marginBottom: 20 }}
        >
          <div style={{ display: 'flex', gap: 10, marginBottom: showFilters ? 16 : 0, flexWrap: 'wrap' }}>
            <Input
              prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />}
              placeholder="Search by action, actor, or target..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200, borderRadius: 10 }}
              size="large"
            />
            <Button
              icon={<FilterOutlined />}
              onClick={() => setShowFilters(!showFilters)}
              style={{ borderRadius: 10, height: 44 }}
              type={showFilters ? 'primary' : 'default'}
            >
              Filters
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                display: 'flex',
                gap: 12,
                padding: 16,
                background: 'var(--color-surface)',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
                flexWrap: 'wrap',
              }}
            >
              <Select
                placeholder="Action type"
                style={{ width: 180 }}
                size="large"
                allowClear
                options={[
                  { label: 'user.*', value: 'user' },
                  { label: 'document.*', value: 'document' },
                  { label: 'api_key.*', value: 'api_key' },
                  { label: 'permission.*', value: 'permission' },
                ]}
              />
              <Select
                placeholder="Actor"
                style={{ width: 200 }}
                size="large"
                allowClear
                options={[
                  { label: 'admin@acme.co', value: 'admin@acme.co' },
                  { label: 'jane@acme.co', value: 'jane@acme.co' },
                  { label: 'bob@acme.co', value: 'bob@acme.co' },
                ]}
              />
              <DatePicker.RangePicker style={{ borderRadius: 10 }} size="large" />
            </motion.div>
          )}
        </motion.div>

        {/* Events table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <div className="card-elevated" style={{ overflow: 'hidden' }}>
            <div style={{ overflow: 'auto' }}>
              <div style={{ minWidth: 700 }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 1.2fr 1fr 0.8fr 100px 80px',
                  padding: '12px 24px',
                  background: 'var(--color-surface)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  <span>Action</span>
                  <span>Actor</span>
                  <span>Target</span>
                  <span>IP</span>
                  <span>Time</span>
                  <span>Status</span>
                </div>

                {filtered.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.02 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.3fr 1.2fr 1fr 0.8fr 100px 80px',
                      padding: '14px 24px',
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                      fontSize: 14,
                      alignItems: 'center',
                      transition: 'background 0.15s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--row-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--color-primary)',
                    }}>
                      {event.action}
                    </span>
                    <span style={{ color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {event.actor}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)', fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }}>
                      {event.target}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)', fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>
                      {event.ip}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Tag
                      color={event.status === 'success' ? 'green' : event.status === 'warning' ? 'orange' : 'red'}
                      style={{ margin: 0, borderRadius: 6, fontSize: 11, fontWeight: 600 }}
                    >
                      {event.status}
                    </Tag>
                  </motion.div>
                ))}

                {filtered.length === 0 && (
                  <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No events match your search.
                  </div>
                )}
              </div>
            </div>

            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
                Showing {filtered.length} of {MOCK_EVENTS.length} events
              </Text>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button size="small" disabled>Previous</Button>
                <Button size="small">Next</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PortalLayout>
  )
}
