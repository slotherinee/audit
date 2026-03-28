import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { Features } from '~/components/Features'
import { HowItWorks } from '~/components/HowItWorks'
import { Playground } from '~/components/Playground'
import { Pricing } from '~/components/Pricing'
import { Comparison } from '~/components/Comparison'
import { FAQ } from '~/components/FAQ'
import { CTA } from '~/components/CTA'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Trailway — Audit Logging API for Developers' },
      {
        name: 'description',
        content: 'Ship enterprise-grade audit logging in minutes, not sprints. Open source SDK, SOC 2 ready, from $19/month with 100k events. Built for indie developers and startups.',
      },
      { property: 'og:title', content: 'Trailway — Audit Logging API for Developers' },
      {
        property: 'og:description',
        content: 'Ship enterprise-grade audit logging in minutes. One API call, full compliance. From $19/month.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Trailway — Audit Logging API for Developers' },
      {
        name: 'twitter:description',
        content: 'Ship enterprise-grade audit logging in minutes. One API call, full compliance. From $19/month.',
      },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Playground />
      <Pricing />
      <Comparison />
      <FAQ />
      <CTA />
    </main>
  )
}
