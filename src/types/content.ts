export type ServiceArea = {
  title: string
}

export type ExpertiseItem = {
  title: string
  body: string
}

export type PortfolioCard = {
  title: string
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
  /** Honeypot — non-semantic name so browser autofill never touches it */
  xfield: string
}
