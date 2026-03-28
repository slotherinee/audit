import type { FAQItem } from '~/types'

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How quickly can I get started?',
    answer: 'Sign up free, create a project, grab your API key, and install the SDK. Your first audit event can be live in under 5 minutes — no complex setup or configuration required.',
  },
  {
    question: 'What\'s included in the Free plan?',
    answer: 'The Free plan includes 5,000 events per month with 14-day retention. It\'s completely free with no credit card required — perfect for prototyping and small projects.',
  },
  {
    question: 'Can I export events for compliance?',
    answer: 'Yes. Pro and Business plans include CSV export and SOC 2 readiness packages. You can export filtered event data at any time through the dashboard or API.',
  },
  {
    question: 'How does billing work?',
    answer: 'Subscriptions renew monthly. You can upgrade, downgrade, or cancel at any time with no penalties. We\'ll send you a heads-up email 7 days before each renewal.',
  },
  {
    question: 'Is the SDK open source?',
    answer: 'Yes! The @trailway/sdk is MIT licensed — fully open source with no legal restrictions for your customers. Under 5KB gzipped with TypeScript types included.',
  },
  {
    question: 'Where are your servers located?',
    answer: 'Our infrastructure is hosted in Europe. We are fully GDPR compliant and your data never leaves the EU. Perfect for companies with data residency requirements.',
  },
]
