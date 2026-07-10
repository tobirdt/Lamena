import type { ExpertiseItem, PortfolioCard, ServiceArea } from '../types/content'

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
] as const

export const expertiseItems: ExpertiseItem[] = [
  {
    title: 'Security and safety requirements',
    body: 'Governmental, defense and industrial environments with complex technical and regulatory demands.',
  },
  {
    title: 'Strategic equipment partnerships',
    body: 'Close collaboration with leading manufacturers for reliable execution, supply and support.',
  },
  {
    title: 'Training and after-sales support',
    body: 'Operator training and after-sales service that keep solutions running at every level.',
  },
]

export const mediationAreas: ServiceArea[] = [
  { title: 'Market entry and analysis' },
  { title: 'Business origination' },
  { title: 'Product supply and placement' },
  { title: 'Turn-key projects' },
]

export const consultingAreas: ServiceArea[] = [
  { title: 'Sales and marketing strategy' },
  { title: 'National and international legal frameworks' },
  { title: 'Corporate transformation' },
  { title: 'Finance, controlling, auditing and asset management' },
]

export const portfolioCards: PortfolioCard[] = [
  {
    title: 'Security & safety',
    body: 'Engineering support and advisory for governmental authorities, defense and organizations in sensitive environments.',
    type: 'security',
  },
  {
    title: 'Communication industries',
    body: 'Consulting and mediation for service providers, regulators and manufacturers — from product selection to implementation.',
    type: 'communication',
  },
  {
    title: 'Finance & transformation',
    body: 'Finance, controlling, auditing and asset management advisory for companies navigating growth and compliance.',
    type: 'finance',
  },
]

export const operatingSteps = [
  { title: 'Understand', body: 'Requirements, regulatory environments and technical constraints are mapped first.' },
  { title: 'Connect', body: 'The right manufacturers, specialists and partners are mobilized around the project.' },
  { title: 'Deliver', body: 'Turnkey implementation, operator training and after-sales service keep it operational.' },
] as const

export const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=Lamena%20FZE%20Jebel%20Ali%20Free%20Zone%20Dubai%20UAE'
