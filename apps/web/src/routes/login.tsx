import { createFileRoute } from '@tanstack/react-router'
import { Form, Input, Button, Typography, Row, Col, Checkbox } from 'antd'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

const { Text } = Typography

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <section style={{ padding: '80px 24px', minHeight: 'calc(100vh - 64px)', background: 'var(--color-surface)' }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={14} lg={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="card-elevated" style={{ padding: 36 }}>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>
                  Welcome back
                </h2>
                <Text style={{ color: 'var(--color-text-muted)' }}>Sign in to your account</Text>
              </div>

              <Form layout="vertical">
                <Form.Item label={<span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Email</span>} required>
                  <Input type="email" placeholder="you@example.com" size="large" />
                </Form.Item>

                <Form.Item label={<span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Password</span>} required>
                  <Input.Password placeholder="••••••••" size="large" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <Checkbox><span style={{ color: 'var(--color-text-muted)' }}>Remember me</span></Checkbox>
                </div>

                <Button
                  type="primary"
                  block
                  size="large"
                  style={{ fontWeight: 600, borderRadius: 10, height: 48, marginBottom: 16 }}
                >
                  Sign In
                </Button>

                <div style={{ textAlign: 'center' }}>
                  <Text style={{ color: 'var(--color-text-muted)' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Sign up</Link>
                  </Text>
                </div>
              </Form>
            </div>
          </motion.div>
        </Col>
      </Row>
    </section>
  )
}
