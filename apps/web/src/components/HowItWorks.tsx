import { Typography } from 'antd'
import { motion } from 'motion/react'
import { ScrollReveal } from './ScrollReveal'
import { CodeBlock } from './CodeBlock'

const { Text } = Typography

const STEPS = [
  {
    step: '01',
    title: 'Install the SDK',
    description: 'One command. TypeScript-first with full type safety. Under 5KB gzipped.',
    code: `npm install @trailway/sdk`,
    filename: 'terminal',
  },
  {
    step: '02',
    title: 'Track events',
    description: 'Single API call to log any action. Authorize with your project API key and fire away.',
    code: `import { Trailway } from '@trailway/sdk'

const trail = new Trailway({
  apiKey: 'tw_live_...'
})

await trail.track({
  action: 'user.deleted',
  actor: 'admin_1',
  target: 'user_42',
  metadata: { reason: 'compliance' },
})`,
    filename: 'app.ts',
  },
  {
    step: '03',
    title: 'Query & export',
    description: 'Filter by action, actor, or date range. Export CSV for SOC 2 auditors.',
    code: `const events = await trail.query({
  action: 'user.*',
  from: '2024-01-01',
  limit: 50,
})

// Or use the REST API directly
// GET /v1/events?action=user.*&from=2024-01-01`,
    filename: 'audit.ts',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-responsive">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 56 }}>
            <div>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--color-primary)',
                background: 'var(--color-primary-light)',
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 6,
                marginBottom: 12,
              }}>
                3 STEPS
              </div>
              <h2 style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
                margin: 0,
                lineHeight: 1.2,
              }}>
                From zero to production<br />
                <span style={{ color: 'var(--color-primary)' }}>in under 5 minutes</span>
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div style={{
                  padding: '20px 24px 16px',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      background: 'var(--color-primary)',
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}>
                      {step.step}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', margin: 0, marginBottom: 6 }}>
                        {step.title}
                      </h3>
                      <Text style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.5 }}>
                        {step.description}
                      </Text>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex' }}>
                  <CodeBlock
                    code={step.code}
                    filename={step.filename}
                    showLineNumbers={step.step !== '01'}
                  />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
