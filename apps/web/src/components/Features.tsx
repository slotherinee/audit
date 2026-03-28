import { Row, Col, Typography } from 'antd'
import {
  RocketOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  SearchOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import { motion } from 'motion/react'
import { PROMO_FEATURES } from '~/mock-data'
import { ScrollReveal } from './ScrollReveal'

const { Text } = Typography

const ICONS = [
  RocketOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  SearchOutlined,
  DollarOutlined,
]

export function Features() {
  return (
    <section id="features" className="section-responsive" style={{ background: 'var(--color-surface)' }}>
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
              Features
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              margin: '0 0 14px',
            }}>
              Everything you need, nothing you don't
            </h2>
            <Text style={{ fontSize: 17, color: 'var(--color-text-secondary)', display: 'block', maxWidth: 480, margin: '0 auto' }}>
              Audit logging shouldn't be a multi-sprint project. Get enterprise-grade features out of the box.
            </Text>
          </div>
        </ScrollReveal>

        <Row gutter={[20, 20]}>
          {PROMO_FEATURES.map((feature, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Col xs={24} sm={12} lg={8} key={i}>
                <ScrollReveal delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    style={{ height: '100%' }}
                  >
                    <div
                      className="card-elevated"
                      style={{ padding: 28, height: '100%', cursor: 'default' }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: 'var(--color-primary-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 18,
                        }}
                      >
                        <Icon style={{ fontSize: 20, color: 'var(--color-primary)' }} />
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 8px' }}>
                        {feature.title}
                      </h3>
                      <Text style={{ color: 'var(--color-text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
                        {feature.description}
                      </Text>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
  )
}
