import { Link, useRouter } from '@tanstack/react-router'
import {
  DashboardOutlined,
  UnorderedListOutlined,
  KeyOutlined,
  SettingOutlined,
  BookOutlined,
  LeftOutlined,
  RightOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'

const sidebarItems = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardOutlined },
  { label: 'Events', href: '/events', icon: UnorderedListOutlined },
  { label: 'API Keys', href: '/settings/api-keys', icon: KeyOutlined },
  { label: 'Settings', href: '/settings', icon: SettingOutlined },
  { label: 'Docs', href: '/docs', icon: BookOutlined },
]

export function PortalLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const currentPath = router.state.location.pathname
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768
    }
    return true
  })

  return (
    <>
      <div className={`portal-layout ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        {/* Sidebar */}
        <aside className="portal-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 12px 16px', borderBottom: '1px solid var(--color-border)', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontSize: 16,
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s',
                margin: 'auto',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <LeftOutlined /> : <RightOutlined />}
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            {sidebarItems.map((item) => {
              const isActive = currentPath === item.href || (item.href !== '/dashboard' && currentPath.startsWith(item.href + '/'))
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`portal-sidebar-item ${isActive ? 'active' : ''}`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <item.icon />
                  {sidebarOpen && item.label}
                </Link>
              )
            })}
          </nav>

          <div style={{ borderTop: '1px solid var(--color-border)', padding: '8px 0' }}>
            <button
              className="portal-sidebar-item"
              onClick={() => { window.location.href = '/login' }}
              title={!sidebarOpen ? 'Log out' : undefined}
              style={{ color: 'var(--color-text-muted)' }}
            >
              <LogoutOutlined />
              {sidebarOpen && 'Log out'}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="portal-content">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </>
  )
}
