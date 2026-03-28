import { Typography } from 'antd'
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled } from '@ant-design/icons'
import { motion } from 'motion/react'
import { ScrollReveal } from './ScrollReveal'

const { Text } = Typography

type CellValue = 'yes' | 'no' | 'soon' | string

type ComparisonFeature = {
  feature: string
  trailway: CellValue
  auditkit: CellValue
  workos: CellValue
  custom: CellValue
}

const FEATURES: ComparisonFeature[] = [
  { feature: 'Price (100k events)', trailway: '$19/mo', auditkit: '$39/mo', workos: '$99/mo', custom: '2+ weeks dev' },
  { feature: 'Setup time', trailway: '< 5 min', auditkit: '< 5 min', workos: '< 5 min', custom: '2+ weeks' },
  { feature: 'Open-source SDK', trailway: 'yes', auditkit: 'no', workos: 'no', custom: 'no' },
  { feature: 'SOC 2 ready', trailway: 'yes', auditkit: 'yes', workos: 'yes', custom: 'no' },
  { feature: 'Tenant isolation', trailway: 'yes', auditkit: 'yes', workos: 'yes', custom: 'no' },
  { feature: 'Indie-friendly pricing', trailway: 'yes', auditkit: 'no', workos: 'no', custom: 'no' },
  { feature: 'Embedded viewer', trailway: 'soon', auditkit: 'yes', workos: 'yes', custom: 'no' },
  { feature: 'MIT license', trailway: 'yes', auditkit: 'no', workos: 'no', custom: 'no' },
]

function CellContent({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === 'yes') {
    return <CheckCircleFilled style={{ fontSize: 18, color: highlight ? 'var(--color-primary)' : 'var(--color-success)' }} />
  }
  if (value === 'no') {
    return <CloseCircleFilled style={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
  }
  if (value === 'soon') {
    return <ClockCircleFilled style={{ fontSize: 18, color: 'var(--color-warning)' }} />
  }
  return (
    <span style={{
      fontSize: 14,
      fontWeight: highlight ? 700 : 400,
      color: highlight ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    }}>
      {value}
    </span>
  )
}

const PROVIDERS = [
  { key: 'trailway' as const, label: 'Trailway', highlight: true },
  { key: 'auditkit' as const, label: 'AuditKit', highlight: false },
  { key: 'workos' as const, label: 'WorkOS', highlight: false },
  { key: 'custom' as const, label: 'Custom Build', highlight: false },
]

export function Comparison() {
  return (
    <section id="comparison" className="section-responsive" style={{ background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 20,
            marginBottom: 48,
          }}>
            <div style={{
              width: 4,
              borderRadius: 2,
              background: 'linear-gradient(to bottom, var(--color-primary), var(--color-primary-light))',
              flexShrink: 0,
            }} />
            <div>
              <h2 style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
                margin: '0 0 6px',
              }}>
                How we stack up
              </h2>
              <Text style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
                Built for indie developers — not enterprise sales pipelines.
              </Text>
            </div>
          </div>
        </ScrollReveal>

        <div className="comparison-scroll-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="comparison-grid"
            style={{
              background: 'var(--color-bg)',
              borderRadius: 16,
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow)',
              overflow: 'hidden',
            }}
          >
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '200px repeat(4, 1fr)',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <div style={{ padding: '16px 20px' }} />
              {PROVIDERS.map((p) => (
                <div
                  key={p.key}
                  style={{
                    padding: '16px 12px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    color: p.highlight ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    background: p.highlight ? 'var(--comparison-highlight)' : 'transparent',
                  }}
                >
                  {p.label}
                </div>
              ))}
            </div>

            {/* Feature rows */}
            {FEATURES.map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px repeat(4, 1fr)',
                  borderBottom: i < FEATURES.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--row-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  padding: '14px 20px',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  whiteSpace: 'nowrap',
                }}>
                  {row.feature}
                </div>
                {PROVIDERS.map((p) => (
                  <div
                    key={p.key}
                    style={{
                      padding: '14px 12px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: p.highlight ? 'var(--comparison-highlight)' : 'transparent',
                    }}
                  >
                    <CellContent value={row[p.key]} highlight={p.highlight} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
