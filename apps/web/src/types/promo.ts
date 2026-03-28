export type PromoFeature = {
  title: string
  description: string
}

export type HowItWorkStep = {
  step: string
  title: string
  description: string
  code: string
}

export type PricingPlan = {
  name: string
  price: number
  period: string
  eventsLimit: string
  retention: string
  projects: number
  features: string[]
  popular?: boolean
}

export type ComparisonRow = {
  feature: string
  trailway: string
  auditkit: string
  workos: string
  custom: string
}

export type FAQItem = {
  question: string
  answer: string
}

export type PlaygroundEvent = {
  id: string
  action: string
  actor: string
  target?: string
  timestamp: string
}
