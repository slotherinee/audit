import { Link } from '@tanstack/react-router'
import { Button, Typography } from 'antd'
import { ArrowRightOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { CodeBlock } from './CodeBlock'

const { Text } = Typography

const codeSnippet = `import { Trailway } from '@trailway/sdk'

const trail = new Trailway({
  apiKey: 'tw_live_...'
})

await trail.track({
  action: 'user.deleted',
  actor: 'admin_1',
  target: 'user_42',
  metadata: { reason: 'compliance' },
})`

export function Hero() {
  return (
    <section className="hero-section-responsive" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="hero-radial" />

      <div
        className="hero-shape float-slow"
        style={{ width: 300, height: 300, background: 'var(--color-primary-glow)', top: 40, left: '-5%' }}
      />
      <div
        className="hero-shape float-medium"
        style={{ width: 200, height: 200, background: 'var(--color-primary-glow)', top: 120, right: '-3%' }}
      />
      <div
        className="hero-shape float-fast"
        style={{ width: 120, height: 120, background: 'rgba(0, 196, 122, 0.04)', bottom: 80, left: '15%' }}
      />
      <div
        className="hero-shape float-medium"
        style={{ width: 80, height: 80, background: 'var(--color-primary-glow)', bottom: 160, right: '20%' }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 100,
              background: 'var(--color-primary-light)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-primary)',
            }}
          >
            <ThunderboltOutlined />
            Now in public beta — Start free today
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            textAlign: 'center',
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 auto 20px',
            maxWidth: 820,
            color: 'var(--color-text)',
          }}
        >
          Ship audit logging in{' '}
          <span style={{ color: 'var(--color-primary)' }}>minutes</span>
          , not sprints
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: 'center',
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: 'var(--color-text-secondary)',
            maxWidth: 580,
            margin: '0 auto 36px',
            lineHeight: 1.65,
          }}
        >
          Enterprise-grade audit trails for indie developers and startups.
          One API call, full compliance. From $19/month.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="cta-buttons"
          style={{ marginBottom: 72 }}
        >
          <Link to="/register">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              style={{
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(22, 104, 220, 0.25)',
              }}
            >
              Get Started Free
            </Button>
          </Link>
          <a href="#playground">
            <Button
              size="large"
              style={{
                fontWeight: 500,
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              Try Live Demo
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            maxWidth: 580,
            margin: '0 auto',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: 14,
          }}
        >
          <CodeBlock code={codeSnippet} filename="app.ts" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="metrics-row"
        >
          {[
            { value: '100k', label: 'events/month' },
            { value: '$19', label: 'starting price' },
            { value: '<5min', label: 'to first event' },
            { value: 'MIT', label: 'open source SDK' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                {item.value}
              </div>
              <Text style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>{item.label}</Text>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
