import { Link, useRouter } from '@tanstack/react-router'
import { Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined, SunOutlined, MoonOutlined, DashboardOutlined, UnorderedListOutlined, KeyOutlined, SettingOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useTheme } from '~/config/theme-context'

const portalItems = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardOutlined },
  { label: 'Events', href: '/events', icon: UnorderedListOutlined },
  { label: 'API Keys', href: '/settings/api-keys', icon: KeyOutlined },
  { label: 'Settings', href: '/settings', icon: SettingOutlined },
  { label: 'Docs', href: '/docs', icon: BookOutlined },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggleTheme, mounted } = useTheme()
  const router = useRouter()

  const pathname = router.state.location.pathname
  const isHomePage = pathname === '/'
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/docs' || pathname.startsWith('/docs/')
  const isPortalPage = ['/dashboard', '/events', '/settings'].some(path =>
    pathname.startsWith(path)
  )
  const showLandingNav = !isPortalPage && !isAuthPage

  const landingItems = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Compare', href: '#comparison' },
  ]

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (!isHomePage && href.startsWith('#')) {
      window.location.href = '/#' + href.slice(1)
    }
  }

  return (
    <nav className="navbar-glass" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-primary)' }}>
              Trailway
            </span>
          </Link>

          {showLandingNav && (
            <div className="nav-desktop" style={{ gap: 28, alignItems: 'center' }}>
              {landingItems.map((item) => (
                <a
                  key={item.label}
                  href={isHomePage ? item.href : '/#' + item.href.slice(1)}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: 15,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/docs"
                style={{
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: 15,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                Docs
              </Link>
            </div>
          )}

          {isAuthPage ? (
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {mounted && isDark ? <SunOutlined /> : <MoonOutlined />}
            </button>
          ) : (
            <>
              <div className="nav-desktop" style={{ gap: 12, alignItems: 'center' }}>
                <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
                  {mounted && isDark ? <SunOutlined /> : <MoonOutlined />}
                </button>
                {!isPortalPage && (
                  <>
                    <Link to="/login">
                      <Button type="text" style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button type="primary" style={{ fontWeight: 600, borderRadius: 10 }}>
                        Get Started Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <div className="nav-mobile-toggle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
                  {mounted && isDark ? <SunOutlined /> : <MoonOutlined />}
                </button>
                <Button
                  type="text"
                  icon={<MenuOutlined style={{ color: 'var(--color-text)', fontSize: 20 }} />}
                  onClick={() => setMenuOpen(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Drawer
        title={null}
        placement="right"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        size="default"
        closeIcon={<CloseOutlined style={{ color: 'var(--color-text-muted)' }} />}
        styles={{ body: { padding: 24 }, header: { borderBottom: 'none' } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {isPortalPage ? (
            <>
              {portalItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: router.state.location.pathname === item.href || router.state.location.pathname.startsWith(item.href + '/') ? 'var(--color-primary)' : 'var(--color-text)',
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 500,
                    padding: '14px 0',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { setMenuOpen(false); window.location.href = '/login' }}
                style={{
                  color: 'var(--color-text-muted)',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 500,
                  padding: '14px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <LogoutOutlined />
                Log out
              </button>
            </>
          ) : (
            <>
              {landingItems.map((item) => (
                <a
                  key={item.label}
                  href={isHomePage ? item.href : '/#' + item.href.slice(1)}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 500,
                    padding: '14px 0',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/docs"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 500,
                  padding: '14px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Docs
              </Link>
              <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button block size="large">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <Button type="primary" block size="large">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </nav>
  )
}
