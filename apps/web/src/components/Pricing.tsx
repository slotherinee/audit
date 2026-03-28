import { Row, Col, Typography } from 'antd'
import { motion } from 'motion/react'
import { useState } from 'react'
import { PRICING_PLANS } from '~/mock-data'
import { PricingCard } from './PricingCard'
import { ScrollReveal } from './ScrollReveal'

const { Text } = Typography

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <section id="pricing" className="section-responsive">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              margin: '0 0 12px',
            }}>
              Pick your plan
            </h2>
            <Text style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
              Start free, no credit card required.{' '}
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Save 20%</span>{' '}
              with annual billing.
            </Text>
          </div>
        </ScrollReveal>

        <Row gutter={[16, 16]}>
          {PRICING_PLANS.map((plan, i) => (
            <Col xs={24} sm={12} lg={6} key={plan.name}>
              <motion.div
                style={{ height: '100%', cursor: 'pointer' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPlan(selectedPlan === plan.name ? null : plan.name)}
              >
                <PricingCard
                  name={plan.name}
                  price={plan.price}
                  period={plan.period}
                  features={plan.features}
                  popular={plan.popular}
                  selected={selectedPlan === plan.name}
                />
              </motion.div>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Text style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
            All plans include full API access and email support. Cancel anytime.
          </Text>
        </div>
      </div>
    </section>
  )
}
