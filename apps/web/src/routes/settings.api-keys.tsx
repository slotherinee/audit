import { createFileRoute } from '@tanstack/react-router'
import { Button, Input, Typography, Modal, Tag } from 'antd'
import { PlusOutlined, CopyOutlined, DeleteOutlined, KeyOutlined, CheckOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useState } from 'react'
import { PortalLayout } from '~/components/PortalLayout'

const { Text } = Typography

export const Route = createFileRoute('/settings/api-keys')({
  component: ApiKeys,
})

type ApiKey = {
  id: string
  name: string
  prefix: string
  createdAt: string
  lastUsed: string | null
  status: 'active' | 'revoked'
}

const MOCK_KEYS: ApiKey[] = [
  { id: '1', name: 'Production', prefix: 'tw_live_a3f...', createdAt: '2026-02-15', lastUsed: '2 min ago', status: 'active' },
  { id: '2', name: 'Staging', prefix: 'tw_test_b7d...', createdAt: '2026-03-01', lastUsed: '1 day ago', status: 'active' },
  { id: '3', name: 'Old production', prefix: 'tw_live_x9k...', createdAt: '2025-12-10', lastUsed: null, status: 'revoked' },
]

function ApiKeys() {
  const [keys, setKeys] = useState(MOCK_KEYS)
  const [showCreate, setShowCreate] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, prefix: string) => {
    navigator.clipboard.writeText(prefix)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCreate = () => {
    if (!newKeyName.trim()) return
    const newKey: ApiKey = {
      id: Math.random().toString(36).slice(2),
      name: newKeyName,
      prefix: `tw_live_${Math.random().toString(36).slice(2, 5)}...`,
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: null,
      status: 'active',
    }
    setKeys([newKey, ...keys])
    setNewKeyName('')
    setShowCreate(false)
  }

  const handleRevoke = (id: string) => {
    setKeys(keys.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k)))
  }

  return (
    <PortalLayout>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>
              API Keys
            </h1>
            <Text style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
              Manage your project API keys for authentication
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowCreate(true)}
            style={{ borderRadius: 10, fontWeight: 600 }}
          >
            Create Key
          </Button>
        </div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: '16px 20px',
            background: 'var(--color-primary-light)',
            borderRadius: 12,
            border: '1px solid var(--color-primary)',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <EyeInvisibleOutlined style={{ fontSize: 18, color: 'var(--color-primary)' }} />
          <Text style={{ color: 'var(--color-primary)', fontSize: 13 }}>
            API keys are shown only once after creation. Store them securely — we cannot retrieve them later.
          </Text>
        </motion.div>

        {/* Keys list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {keys.map((key, i) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
              className="card-elevated"
              style={{ padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: key.status === 'active' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <KeyOutlined style={{
                      fontSize: 16,
                      color: key.status === 'active' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: 15 }}>{key.name}</span>
                      <Tag
                        color={key.status === 'active' ? 'green' : 'default'}
                        style={{ borderRadius: 6, fontSize: 11, fontWeight: 600, margin: 0 }}
                      >
                        {key.status}
                      </Tag>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                      <span style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 13,
                        color: 'var(--color-text-muted)',
                      }}>
                        {key.prefix}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                        Created {key.createdAt}
                      </span>
                      {key.lastUsed && (
                        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                          Last used {key.lastUsed}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    type="text"
                    icon={copiedId === key.id ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={() => handleCopy(key.id, key.prefix)}
                    style={{ color: copiedId === key.id ? 'var(--color-success)' : 'var(--color-text-muted)' }}
                  />
                  {key.status === 'active' && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRevoke(key.id)}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create modal */}
        <Modal
          title={<span style={{ fontWeight: 700 }}>Create API Key</span>}
          open={showCreate}
          onCancel={() => setShowCreate(false)}
          onOk={handleCreate}
          okText="Create"
          okButtonProps={{ disabled: !newKeyName.trim(), style: { borderRadius: 10, fontWeight: 600 } }}
          cancelButtonProps={{ style: { borderRadius: 10 } }}
        >
          <div style={{ padding: '16px 0' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              Key Name
            </label>
            <Input
              placeholder="e.g., Production, Staging"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              size="large"
              style={{ borderRadius: 10 }}
              onPressEnter={handleCreate}
            />
            <Text style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--color-text-muted)' }}>
              Give your key a descriptive name so you can identify it later.
            </Text>
          </div>
        </Modal>
      </div>
    </PortalLayout>
  )
}
