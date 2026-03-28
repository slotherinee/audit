import { createFileRoute } from '@tanstack/react-router'
import { Typography, Row, Col } from 'antd'
import { motion } from 'motion/react'
import { useState } from 'react'
import { CodeBlock } from '~/components/CodeBlock'

const { Text } = Typography

export const Route = createFileRoute('/docs')({
  component: Docs,
})

const sections = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'installation', label: 'Installation' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'tracking-events', label: 'Tracking Events' },
  { id: 'querying-events', label: 'Querying Events' },
  { id: 'rest-api', label: 'REST API' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'sdks', label: 'SDKs' },
]

function Docs() {
  const [activeSection, setActiveSection] = useState('quickstart')

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', minHeight: 'calc(100vh - 64px)' }}>
      <Row gutter={[48, 32]}>
        {/* Sidebar nav */}
        <Col xs={24} md={6}>
          <nav className="docs-nav">
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', margin: '0 0 12px 16px' }}>
                Documentation
              </h3>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`docs-nav-item ${activeSection === s.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(s.id)}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </Col>

        {/* Content */}
        <Col xs={24} md={18}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Quickstart */}
            <section id="quickstart" style={{ marginBottom: 64 }}>
              <h1 style={{ fontSize: 36, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                Quickstart
              </h1>
              <Text style={{ fontSize: 17, color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 32 }}>
                Get up and running with Trailway in under 5 minutes. This guide covers installation,
                authentication, and sending your first event.
              </Text>
            </section>

            {/* Installation */}
            <section id="installation" style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px' }}>
                Installation
              </h2>
              <Text style={{ color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 16 }}>
                Install the Trailway SDK via your package manager of choice.
              </Text>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: 16 }}>
                <CodeBlock code="npm install @trailway/sdk" filename="terminal" showLineNumbers={false} />
              </div>
              <Text style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
                TypeScript declarations are included — no need for separate @types packages.
              </Text>
            </section>

            {/* Authentication */}
            <section id="authentication" style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px' }}>
                Authentication
              </h2>
              <Text style={{ color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 16 }}>
                Create an API key from your dashboard. Keys start with <code style={{ background: 'var(--color-surface)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>tw_live_</code> for production
                or <code style={{ background: 'var(--color-surface)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>tw_test_</code> for testing.
              </Text>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: 16 }}>
                <CodeBlock
                  code={`import { Trailway } from '@trailway/sdk'

const trail = new Trailway({
  apiKey: process.env.TRAILWAY_API_KEY
  // defaults to 'tw_live_...'
})`}
                  filename="config.ts"
                />
              </div>
              <div style={{
                padding: '14px 18px',
                background: 'var(--color-primary-light)',
                borderRadius: 10,
                border: '1px solid var(--color-primary)',
              }}>
                <Text style={{ color: 'var(--color-primary)', fontSize: 13, fontWeight: 500 }}>
                  Never expose your API key in client-side code. Always use environment variables on your server.
                </Text>
              </div>
            </section>

            {/* Tracking Events */}
            <section id="tracking-events" style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px' }}>
                Tracking Events
              </h2>
              <Text style={{ color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 16 }}>
                Use <code style={{ background: 'var(--color-surface)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>trail.track()</code> to log audit events.
                Every event requires an <strong>action</strong> and <strong>actor</strong>. Optionally include a target and metadata.
              </Text>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: 16 }}>
                <CodeBlock
                  code={`await trail.track({
  action: 'user.deleted',
  actor: 'admin_1',
  target: 'user_42',
  metadata: {
    reason: 'compliance',
    ip: '192.168.1.1',
  },
  timestamp: new Date().toISOString(),
})`}
                  filename="track.ts"
                />
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text)', margin: '24px 0 12px' }}>
                Event Fields
              </h3>
              <div style={{ overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--color-text)' }}>Field</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--color-text)' }}>Type</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--color-text)' }}>Required</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--color-text)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { field: 'action', type: 'string', required: 'Yes', desc: 'Event type (e.g. user.deleted)' },
                      { field: 'actor', type: 'string', required: 'Yes', desc: 'Who performed the action' },
                      { field: 'target', type: 'string', required: 'No', desc: 'Resource being acted upon' },
                      { field: 'metadata', type: 'object', required: 'No', desc: 'Additional key-value data' },
                      { field: 'timestamp', type: 'string', required: 'No', desc: 'ISO 8601 timestamp (auto-generated)' },
                    ].map((row, i) => (
                      <tr key={row.field} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                        <td style={{ padding: '10px 16px' }}>
                          <code style={{ color: 'var(--color-primary)', fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }}>{row.field}</code>
                        </td>
                        <td style={{ padding: '10px 16px', color: 'var(--color-text-muted)' }}>{row.type}</td>
                        <td style={{ padding: '10px 16px', color: row.required === 'Yes' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600 }}>{row.required}</td>
                        <td style={{ padding: '10px 16px', color: 'var(--color-text-secondary)' }}>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Querying Events */}
            <section id="querying-events" style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px' }}>
                Querying Events
              </h2>
              <Text style={{ color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 16 }}>
                Retrieve events with flexible filtering by action, actor, date range, and more.
              </Text>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: 16 }}>
                <CodeBlock
                  code={`const events = await trail.query({
  action: 'user.*',
  actor: 'admin_1',
  from: '2024-01-01',
  to: '2024-12-31',
  limit: 50,
  offset: 0,
})

console.log(events)
// [{ action: 'user.deleted', actor: 'admin_1', ... }]`}
                  filename="query.ts"
                />
              </div>
            </section>

            {/* REST API */}
            <section id="rest-api" style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px' }}>
                REST API
              </h2>
              <Text style={{ color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 16 }}>
                For non-JavaScript environments, use the REST API directly.
              </Text>

              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: '24px 0 12px' }}>
                POST /v1/events
              </h3>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: 24 }}>
                <CodeBlock
                  code={`curl -X POST https://api.trailway.dev/v1/events \\
  -H "Authorization: Bearer tw_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action": "user.deleted",
    "actor": "admin_1",
    "target": "user_42",
    "metadata": { "reason": "compliance" }
  }'`}
                  filename="terminal"
                  showLineNumbers={false}
                />
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: '24px 0 12px' }}>
                GET /v1/events
              </h3>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <CodeBlock
                  code={`curl https://api.trailway.dev/v1/events\\
  ?action=user.*\\
  &actor=admin_1\\
  &from=2024-01-01\\
  &limit=50\\
  &offset=0 \\
  -H "Authorization: Bearer tw_live_xxx"`}
                  filename="terminal"
                  showLineNumbers={false}
                />
              </div>
            </section>

            {/* Webhooks */}
            <section id="webhooks" style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px' }}>
                Webhooks
              </h2>
              <Text style={{ color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 16 }}>
                Receive real-time notifications when events are logged. Configure webhook endpoints from your dashboard
                to push events to Slack, Discord, or your own services.
              </Text>
              <div style={{
                padding: '20px 24px',
                background: 'var(--color-surface)',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
              }}>
                <Text style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
                  Webhook configuration is available in the Dashboard under Settings. Coming soon to the SDK.
                </Text>
              </div>
            </section>

            {/* SDKs */}
            <section id="sdks" style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 16px' }}>
                SDKs
              </h2>
              <Text style={{ color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.7, marginBottom: 24 }}>
                Official SDK support for popular languages and frameworks.
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {[
                  { name: 'Node.js / TypeScript', status: 'Available', color: 'green' },
                  { name: 'Python', status: 'Coming Soon', color: 'orange' },
                  { name: 'Go', status: 'Coming Soon', color: 'orange' },
                  { name: 'Ruby', status: 'Planned', color: 'default' },
                  { name: 'PHP', status: 'Planned', color: 'default' },
                  { name: 'REST API', status: 'Available', color: 'green' },
                ].map((sdk) => (
                  <div
                    key={sdk.name}
                    className="card-elevated"
                    style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: 14 }}>{sdk.name}</span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: sdk.color === 'green' ? 'var(--color-success)' : sdk.color === 'orange' ? 'var(--color-warning)' : 'var(--color-text-muted)',
                    }}>
                      {sdk.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}
