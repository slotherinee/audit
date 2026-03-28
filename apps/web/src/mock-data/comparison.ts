import type { ComparisonRow } from '~/types'

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: 'Pricing (100k events)', trailway: '$19/mo', auditkit: '$39/mo', workos: '$99/mo', custom: 'Expensive' },
  { feature: 'License', trailway: 'MIT', auditkit: 'AGPLv3', workos: 'Proprietary', custom: 'Proprietary' },
  { feature: 'Setup Time', trailway: '< 5 min', auditkit: '< 5 min', workos: '< 5 min', custom: '2+ weeks' },
  { feature: 'Tenant Isolation', trailway: '✓', auditkit: '✓', workos: '✓', custom: 'Maybe' },
  { feature: 'Open Source SDK', trailway: '✓ MIT', auditkit: '✗', workos: '✗', custom: 'N/A' },
  { feature: 'SOC 2 Ready', trailway: '✓', auditkit: '✓', workos: '✓', custom: '✗' },
  { feature: 'Indie Friendly', trailway: '✓', auditkit: '✗ Enterprise', workos: '✗ Enterprise', custom: 'N/A' },
  { feature: 'Embedded Viewer', trailway: 'Coming soon', auditkit: '✓', workos: '✓', custom: '✗' },
]
