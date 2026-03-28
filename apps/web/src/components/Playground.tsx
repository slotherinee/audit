import { useState } from 'react'
import { Input, Button, Row, Col, Typography } from 'antd'
import { CopyOutlined, SendOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import { motion, AnimatePresence } from 'motion/react'
import { SAMPLE_EVENTS } from '~/mock-data'
import { ScrollReveal } from './ScrollReveal'
import type { PlaygroundEvent } from '~/types'

const { Text } = Typography

export function Playground() {
  const [events, setEvents] = useState<PlaygroundEvent[]>(SAMPLE_EVENTS)
  const [action, setAction] = useState('user.deleted')
  const [actor, setActor] = useState('admin_1')
  const [target, setTarget] = useState('user_42')
  const [copied, setCopied] = useState(false)

  const handleSendEvent = () => {
    const newEvent: PlaygroundEvent = {
      id: Math.random().toString(36).slice(2, 11),
      action,
      actor,
      target,
      timestamp: new Date().toISOString(),
    }
    setEvents([newEvent, ...events])
  }

  const handleRemoveEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const curlCode = `curl -X POST https://api.trailway.dev/v1/events \\
  -H "Authorization: Bearer tw_demo_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action": "${action}",
    "actor": "${actor}",
    "target": "${target}"
  }'`

  return (
    <section id="playground" className="section-responsive" style={{ background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 13,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-primary)',
              marginBottom: 12,
            }}>
              Playground
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              margin: '0 0 14px',
            }}>
              Try it live
            </h2>
            <Text style={{ fontSize: 17, color: 'var(--color-text-secondary)' }}>
              Send a test event and watch it appear in real-time
            </Text>
          </div>
        </ScrollReveal>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="card-elevated" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 24px' }}>
                  Send Event
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                      Action
                    </label>
                    <Input
                      value={action}
                      onChange={(e) => setAction(e.target.value)}
                      placeholder="user.deleted"
                      style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                      Actor
                    </label>
                    <Input
                      value={actor}
                      onChange={(e) => setActor(e.target.value)}
                      placeholder="admin_1"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                      Target
                    </label>
                    <Input
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="user_42"
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Request
                    </span>
                    <pre className="code-block" style={{
                      padding: 14,
                      marginTop: 8,
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: 'var(--color-text-secondary)',
                      overflow: 'auto',
                      maxHeight: 110,
                    }}>
                      <code>{curlCode}</code>
                    </pre>
                    <Button
                      type="text"
                      icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                      size="small"
                      style={{ color: copied ? 'var(--color-success)' : 'var(--color-text-muted)', marginTop: 4, fontSize: 12 }}
                      onClick={handleCopy}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSendEvent}
                      size="large"
                      style={{
                        flex: 1,
                        fontWeight: 600,
                        borderRadius: 10,
                        boxShadow: '0 4px 12px rgba(22, 104, 220, 0.2)',
                      }}
                    >
                      Send Event
                    </Button>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => setEvents([])}
                      size="large"
                      style={{ borderRadius: 10 }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>

          <Col xs={24} lg={14}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="card-elevated" style={{ padding: 28, minHeight: 400 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                    Events
                  </h3>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    background: 'var(--color-primary-light)',
                    padding: '3px 12px',
                    borderRadius: 100,
                  }}>
                    {events.length}
                  </span>
                </div>

                <div
                  className="playground-grid-header"
                  style={{
                    padding: '10px 12px',
                    background: 'var(--color-surface)',
                    borderRadius: 10,
                    marginBottom: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span>Action</span>
                  <span className="playground-col-actor">Actor</span>
                  <span className="playground-col-target">Target</span>
                  <span>Time</span>
                  <span />
                </div>

                <div style={{ maxHeight: 340, overflow: 'auto' }}>
                  <AnimatePresence mode="popLayout">
                    {events.map((event) => (
                      <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0, y: -16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 40, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="playground-grid-row"
                        style={{
                          padding: '10px 12px',
                          borderBottom: '1px solid var(--color-border-light)',
                          alignItems: 'center',
                          fontSize: 14,
                        }}
                      >
                        <span style={{
                          color: 'var(--color-primary)',
                          fontWeight: 600,
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: 13,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {event.action}
                        </span>
                        <span className="playground-col-actor" style={{ color: 'var(--color-text)' }}>{event.actor}</span>
                        <span className="playground-col-target" style={{ color: 'var(--color-text-muted)' }}>{event.target}</span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
                          {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <Button
                          type="text"
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveEvent(event.id)}
                          style={{ color: 'var(--color-text-muted)', padding: 0, width: 28, height: 28, minWidth: 28 }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-error)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {events.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}
                    >
                      No events yet. Send one to see it here.
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
