import { createFileRoute } from '@tanstack/react-router'
import { Input, Button, Typography, Switch, Divider, Select } from 'antd'
import { UserOutlined, MailOutlined, BellOutlined, GlobalOutlined, LockOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useState } from 'react'
import { PortalLayout } from '~/components/PortalLayout'

const { Text } = Typography

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@acme.co',
    company: 'Acme Inc.',
    timezone: 'UTC',
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyDigest: true,
    slackIntegration: false,
    webhookFailures: true,
  })

  return (
    <PortalLayout>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>
            Settings
          </h1>
          <Text style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
            Manage your account and preferences
          </Text>
        </div>

        {/* Profile section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-elevated" style={{ marginBottom: 24 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <UserOutlined style={{ color: 'var(--color-primary)', fontSize: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                  Profile
                </h3>
              </div>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Text style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>Full Name</Text>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  prefix={<UserOutlined style={{ color: 'var(--color-text-muted)' }} />}
                  size="large"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Text style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>Email</Text>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  prefix={<MailOutlined style={{ color: 'var(--color-text-muted)' }} />}
                  size="large"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Text style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>Company</Text>
                <Input
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  prefix={<GlobalOutlined style={{ color: 'var(--color-text-muted)' }} />}
                  size="large"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Text style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>Timezone</Text>
                <Select
                  value={profile.timezone}
                  onChange={(val) => setProfile({ ...profile, timezone: val })}
                  size="large"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'UTC', label: 'UTC' },
                    { value: 'America/New_York', label: 'Eastern Time (ET)' },
                    { value: 'America/Chicago', label: 'Central Time (CT)' },
                    { value: 'America/Denver', label: 'Mountain Time (MT)' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                    { value: 'Europe/London', label: 'London (GMT)' },
                    { value: 'Europe/Berlin', label: 'Berlin (CET)' },
                    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
                  ]}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
                <Button type="primary" style={{ fontWeight: 600, borderRadius: 10 }}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="card-elevated" style={{ marginBottom: 24 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <BellOutlined style={{ color: 'var(--color-primary)', fontSize: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                  Notifications
                </h3>
              </div>
            </div>
            <div style={{ padding: 24 }}>
              {[
                { key: 'emailAlerts' as const, label: 'Email alerts', desc: 'Get notified about critical events via email' },
                { key: 'weeklyDigest' as const, label: 'Weekly digest', desc: 'Receive a summary of activity every Monday' },
                { key: 'slackIntegration' as const, label: 'Slack notifications', desc: 'Forward alerts to your Slack channel' },
                { key: 'webhookFailures' as const, label: 'Webhook failure alerts', desc: 'Get notified when webhook delivery fails' },
              ].map((item, i, arr) => (
                <div key={item.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <Text style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{item.desc}</Text>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onChange={(val) => setNotifications({ ...notifications, [item.key]: val })}
                    />
                  </div>
                  {i < arr.length - 1 && <Divider style={{ margin: 0, borderColor: 'var(--color-border-light)' }} />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Security section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="card-elevated" style={{ marginBottom: 24 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LockOutlined style={{ color: 'var(--color-primary)', fontSize: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                  Security
                </h3>
              </div>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                    Password
                  </div>
                  <Text style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                    Last changed 30 days ago
                  </Text>
                </div>
                <Button style={{ borderRadius: 10 }}>Change Password</Button>
              </div>
              <Divider style={{ margin: 0, borderColor: 'var(--color-border-light)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                    Two-factor authentication
                  </div>
                  <Text style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                    Add an extra layer of security to your account
                  </Text>
                </div>
                <Button style={{ borderRadius: 10 }}>Enable 2FA</Button>
              </div>
              <Divider style={{ margin: 0, borderColor: 'var(--color-border-light)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-error)', marginBottom: 2 }}>
                    Delete account
                  </div>
                  <Text style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                    Permanently delete your account and all data
                  </Text>
                </div>
                <Button danger style={{ borderRadius: 10 }}>Delete Account</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PortalLayout>
  )
}
