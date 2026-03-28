import { createFileRoute } from '@tanstack/react-router'
import { Row, Col, Typography, Button, Tag } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  ApiOutlined,
} from '@ant-design/icons'
import { motion } from 'motion/react'
import { PortalLayout } from '~/components/PortalLayout'

const { Text } = Typography

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

const stats = [
  { label: 'Total Events', value: '24,891', change: '+12.3%', up: true, icon: ThunderboltOutlined },
  { label: 'Events Today', value: '1,247', change: '+8.1%', up: true, icon: ClockCircleOutlined },
  { label: 'Active Projects', value: '3', change: '0%', up: true, icon: SafetyCertificateOutlined },
  { label: 'API Calls (24h)', value: '4,012', change: '-2.1%', up: false, icon: ApiOutlined },
]

const recentEvents = [
  { action: 'user.login', actor: 'admin@acme.co', target: 'session_8f2a', time: '2 min ago', status: 'success' },
  { action: 'document.updated', actor: 'jane@acme.co', target: 'doc_1234', time: '5 min ago', status: 'success' },
  { action: 'api_key.created', actor: 'admin@acme.co', target: 'key_tw_live', time: '12 min ago', status: 'success' },
  { action: 'user.invited', actor: 'admin@acme.co', target: 'bob@acme.co', time: '1h ago', status: 'success' },
  { action: 'permission.changed', actor: 'jane@acme.co', target: 'role_editor', time: '2h ago', status: 'warning' },
  { action: 'export.started', actor: 'admin@acme.co', target: 'export_csv_q1', time: '3h ago', status: 'success' },
  { action: 'user.deleted', actor: 'admin@acme.co', target: 'user_42', time: '5h ago', status: 'error' },
  { action: 'project.created', actor: 'jane@acme.co', target: 'proj_new_app', time: '8h ago', status: 'success' },
]

function Dashboard() {
  return (
    <PortalLayout>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>
            Dashboard
          </h1>
          <Text style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
            Overview of your audit trail activity
          </Text>
        </div>

        {/* Stats grid */}
        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          {stats.map((stat, i) => (
            <Col xs={24} sm={12} lg={6} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="stat-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <stat.icon style={{ fontSize: 18, color: 'var(--color-primary)' }} />
                  </div>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: stat.up ? 'var(--color-success)' : 'var(--color-error)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}>
                    {stat.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {stat.change}
                  </span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <Text style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>{stat.label}</Text>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Recent events */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="card-elevated" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                Recent Events
              </h3>
              <Button type="text" style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: 13 }}>
                View All
              </Button>
            </div>

            <div style={{ overflow: 'auto' }}>
              <div style={{ minWidth: 600 }}>
                {/* Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1.2fr 1fr 100px 80px',
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
                  <span>Time</span>
                  <span>Status</span>
                </div>

                {recentEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.03 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.5fr 1.2fr 1fr 100px 80px',
                      padding: '14px 24px',
                      borderBottom: i < recentEvents.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                      fontSize: 14,
                      alignItems: 'center',
                      transition: 'background 0.15s',
                      cursor: 'default',
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
                    <span style={{ color: 'var(--color-text)' }}>{event.actor}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }}>
                      {event.target}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>{event.time}</span>
                    <Tag
                      color={event.status === 'success' ? 'green' : event.status === 'warning' ? 'orange' : 'red'}
                      style={{ margin: 0, borderRadius: 6, fontSize: 11, fontWeight: 600 }}
                    >
                      {event.status}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PortalLayout>
  )
}
