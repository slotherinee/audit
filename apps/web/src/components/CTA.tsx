import { Link } from '@tanstack/react-router'
import { Button, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'

const { Text } = Typography

export function CTA() {
  return (
    <section className="section-responsive" style={{ background: 'var(--color-surface)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{
          maxWidth: 720,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--color-text)',
          margin: '0 0 14px',
          lineHeight: 1.2,
        }}>
          Start shipping{' '}
          <span style={{ color: 'var(--color-primary)' }}>today</span>
        </h2>

        <Text style={{
          fontSize: 17,
          color: 'var(--color-text-secondary)',
          display: 'block',
          maxWidth: 460,
          margin: '0 auto 36px',
          lineHeight: 1.6,
        }}>
          Join hundreds of developers who closed enterprise deals with Trailway.
          Free to start, no credit card needed.
        </Text>

        <div className="cta-buttons">
          <Link to="/register">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              style={{
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(22, 104, 220, 0.25)',
              }}
            >
              Get Started Free
            </Button>
          </Link>
          <Link to="/docs">
            <Button
              size="large"
              style={{
                fontWeight: 500,
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              View Documentation
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
