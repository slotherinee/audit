import { Collapse, Row, Col, Typography } from 'antd'
import { motion } from 'motion/react'
import { FAQ_ITEMS } from '~/mock-data'
import { ScrollReveal } from './ScrollReveal'
import type { FAQItem } from '~/types'

const { Text } = Typography

export function FAQ() {
  const items = FAQ_ITEMS.map((item: FAQItem) => ({
    key: item.question,
    label: (
      <span style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: 15 }}>
        {item.question}
      </span>
    ),
    children: (
      <Text style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: 15 }}>
        {item.answer}
      </Text>
    ),
  }))

  return (
    <section className="section-responsive">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Row gutter={[48, 32]}>
          <Col xs={24} lg={8}>
            <ScrollReveal>
              <div style={{ position: 'sticky', top: 100 }}>
                <h2 style={{
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                  margin: '0 0 12px',
                  lineHeight: 1.2,
                }}>
                  Got questions?
                </h2>
                <Text style={{ fontSize: 16, color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.6 }}>
                  If you can't find what you're looking for,{' '}
                  <a href="mailto:hello@trailway.dev" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                    reach out
                  </a>{' '}
                  and we'll get back to you within a day.
                </Text>
              </div>
            </ScrollReveal>
          </Col>

          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Collapse
                items={items}
                accordion
                bordered={false}
                expandIconPlacement="end"
                style={{ background: 'transparent' }}
              />
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
