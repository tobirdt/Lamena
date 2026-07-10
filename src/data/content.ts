import type { ExpertiseItem, PortfolioCard, ServiceArea } from '../types/content'

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
] as const

export const proofPoints = [
  { value: '20+', label: 'Years of expertise' },
  { value: '360°', label: 'Consulting to delivery' },
  { value: 'Global', label: 'Partner network' },
] as const

export const expertiseItems: ExpertiseItem[] = [
  {
    title: 'Security and safety requirements',
    body: 'Extensive experience across governmental, defense and industrial environments with complex technical and regulatory demands.',
  },
  {
    title: 'Strategic equipment partnerships',
    body: 'Close collaboration with leading manufacturers enabling reliable project execution, supply and long-term support.',
  },
  {
    title: 'Training and after-sales support',
    body: 'In-depth operator training and exceptional after-sales service that keeps solutions running at every level.',
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
    body: 'Engineering support and advisory for governmental authorities, the defense industry and organizations operating in sensitive or technically demanding environments.',
    type: 'security',
  },
  {
    title: 'Communication industries',
    body: 'Consulting and mediation for communication service providers, regulatory authorities, manufacturers and international organizations seeking product selection, placement and project implementation.',
    type: 'communication',
  },
  {
    title: 'Finance & transformation',
    body: 'Finance, controlling, auditing and asset management advisory for companies navigating growth, restructuring, legal frameworks and international compliance.',
    type: 'finance',
  },
]

export const operatingSteps = [
  { title: 'Understand', body: 'Client requirements, regulatory environments, market signals and technical constraints are mapped before any solution is proposed.' },
  { title: 'Connect', body: 'The right manufacturers, legal specialists, technical engineers and commercial partners are aligned and mobilized around the project.' },
  { title: 'Deliver', body: 'Turnkey implementation, hands-on operator training and after-sales service ensure the solution stays operational at every level.' },
] as const

export const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=Lamena%20FZE%20Jebel%20Ali%20Free%20Zone%20Dubai%20UAE'
