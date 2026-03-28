import { Row, Col, Typography } from 'antd'
import { Link } from '@tanstack/react-router'
import { GithubOutlined, XOutlined } from '@ant-design/icons'

const { Text } = Typography

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Documentation', href: '/docs', isRoute: true },
    { label: 'Changelog', href: '/blog' },
  ],
  Company: [
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="section-responsive" style={{ borderTop: '1px solid var(--color-border)', paddingBottom: 28 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[40, 36]} style={{ marginBottom: 44 }}>
          <Col xs={24} sm={8}>
            <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary)' }}>
              Trailway
            </span>
            <Text style={{ display: 'block', color: 'var(--color-text-muted)', marginTop: 12, fontSize: 14, lineHeight: 1.6 }}>
              Enterprise-grade audit logging for indie developers and startups.
            </Text>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <a
                href="https://github.com/trailway"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <GithubOutlined style={{ fontSize: 18 }} />
              </a>
              <a
                href="https://x.com/trailwaydev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <XOutlined style={{ fontSize: 18 }} />
              </a>
            </div>
          </Col>

          {Object.entries(footerLinks).map(([title, links]) => (
            <Col xs={12} sm={4} key={title}>
              <h4 style={{
                color: 'var(--color-text)',
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 14,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((link) =>
                  'isRoute' in link && link.isRoute ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </Col>
          ))}
        </Row>

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <Text style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
            &copy; {new Date().getFullYear()} Trailway. All rights reserved.
          </Text>
          <Text style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
            Made in Europe
          </Text>
        </div>
      </div>
    </footer>
  )
}
