import { Link } from '@tanstack/react-router'
import { Button, Divider } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'

type PricingCardProps = {
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
  selected?: boolean
}

export function PricingCard({ name, price, period, features, popular, selected }: PricingCardProps) {
  return (
    <motion.div
      className={popular ? 'pricing-popular' : 'card-elevated'}
      style={{
        padding: 28,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'default',
        borderColor: selected ? 'var(--color-primary)' : undefined,
        borderWidth: selected ? 2 : undefined,
        background: selected ? 'var(--color-primary-light)' : undefined,
        transition: 'all 0.2s ease',
      }}
      whileHover={{
        y: -6,
        boxShadow: popular
          ? '0 20px 48px rgba(22, 104, 220, 0.18)'
          : '0 16px 40px rgba(12, 12, 20, 0.12)',
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
    >
      {popular && (
        <div style={{
          position: 'absolute',
          top: -1,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: 'var(--color-primary)',
          color: '#fff',
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 14px',
          borderRadius: '0 0 8px 8px',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}>
          MOST POPULAR
        </div>
      )}

      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 8px' }}>
        {name}
      </h3>

      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 42, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.03em' }}>
          ${price}
        </span>
        <span style={{ color: 'var(--color-text-muted)', marginLeft: 4 }}>/{period}</span>
      </div>

      <Divider style={{ margin: '0 0 18px', borderColor: 'var(--color-border)' }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1 }}>
        {features.map((feature, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              marginBottom: 12,
              fontSize: 14,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <CheckOutlined style={{ color: popular ? 'var(--color-primary)' : 'var(--color-success)', marginTop: 3, flexShrink: 0, fontSize: 13 }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link to="/register" style={{ display: 'block' }}>
        <Button
          type={popular ? 'primary' : 'default'}
          block
          size="large"
          style={{
            fontWeight: 600,
            borderRadius: 10,
            height: 46,
            ...(popular ? { boxShadow: '0 4px 12px rgba(22, 104, 220, 0.2)' } : {}),
          }}
        >
          {price === 0 ? 'Start Free' : 'Start Free Trial'}
        </Button>
      </Link>
    </motion.div>
  )
}
