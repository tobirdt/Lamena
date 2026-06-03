import type { LucideIcon } from 'lucide-react'

export type IconCard = {
  icon: LucideIcon
  title: string
}

export type ExpertiseItem = IconCard & {
  body: string
}

export type PortfolioCard = IconCard & {
  label: string
  body: string
  type: 'security' | 'communication' | 'finance'
}

export type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  appendParagraphs?: string[]
}

export type ContactFormState = {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  message: string
  consent: boolean
  website: string
}
