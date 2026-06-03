import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  ExternalLink,
  Gavel,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  RadioTower,
  Send,
  ShieldCheck,
  Signal,
  Target,
  Truck,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

const proofPoints = [
  { value: '20+', label: 'Years of applied expertise' },
  { value: '360', label: 'Consulting and delivery perspective' },
  { value: 'Global', label: 'Technology and partner network' },
]

const expertiseItems = [
  {
    icon: BadgeCheck,
    title: 'Security and safety requirements',
    body: 'Extensive experience across demanding technical, operational and regulatory environments.',
  },
  {
    icon: Handshake,
    title: 'Strategic equipment partnerships',
    body: 'Close collaboration with leading manufacturers for reliable project execution and support.',
  },
  {
    icon: GraduationCap,
    title: 'Training and after-sales support',
    body: 'Practical enablement for clients, operators and project teams after delivery.',
  },
]

const mediationAreas = [
  { icon: BarChart3, title: 'Market entry and analysis' },
  { icon: UsersRound, title: 'Business origination' },
  { icon: Truck, title: 'Product supply placement' },
  { icon: ClipboardCheck, title: 'Turn-key projects' },
]

const consultingAreas = [
  { icon: Target, title: 'Sales and marketing strategy' },
  { icon: Gavel, title: 'Legal frameworks' },
  { icon: Building2, title: 'Corporate transformation' },
  { icon: Landmark, title: 'Finance, controlling and auditing' },
]

const portfolioCards = [
  {
    icon: ShieldCheck,
    title: 'Security & safety',
    label: 'Risk, infrastructure, operational reliability',
    body: 'Consulting and engineering support for organizations operating in sensitive or technically demanding environments.',
    type: 'security',
  },
  {
    icon: RadioTower,
    title: 'Communication industries',
    label: 'Connectivity, systems, technical mediation',
    body: 'Support for communication service providers, manufacturers and public-sector stakeholders.',
    type: 'communication',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Finance & transformation',
    label: 'Controlling, auditing, transformation',
    body: 'Strategic and operational consulting for companies navigating growth, structure and compliance.',
    type: 'finance',
  },
]

const operatingSteps = [
  { title: 'Understand', body: 'Requirements, market signals and constraints are mapped before solutions are proposed.' },
  { title: 'Connect', body: 'The right technical, legal and commercial partners are aligned around the project.' },
  { title: 'Deliver', body: 'Implementation, training and after-sales support keep the solution operational.' },
]

const privacySections = [
  {
    title: 'Controller',
    paragraphs: [
      'Lamena FZE, Office LB19, LB192701WS17 Area 5.92, Jebel Ali Free Zone, Dubai, UAE is responsible for this website and the processing activities described in this Privacy Policy.',
      'Website inquiries are delivered to holger@rumscheidt.de for review and response. General company contact remains available via info@lamena.ae.',
    ],
  },
  {
    title: 'Personal data we process',
    bullets: [
      'Contact form data: first name, last name, email address, company, phone number, message and consent confirmation.',
      'Technical data: IP address, browser information, device data, timestamps and security logs processed by the hosting provider when the website is accessed.',
      'Email delivery data: metadata required to deliver, monitor and secure email notifications from the contact form.',
    ],
  },
  {
    title: 'Purposes and legal bases',
    bullets: [
      'Responding to inquiries and preparing potential business relationships.',
      'Operating, securing and improving the website.',
      'Documenting communication where this is necessary for legitimate business or legal purposes.',
      'Complying with applicable legal obligations.',
    ],
  },
  {
    title: 'Service providers and transfers',
    paragraphs: [
      'The website is prepared for hosting on Vercel. Contact form emails are prepared to be sent through Resend or an equivalent configured email provider. These providers may process data in countries other than your own.',
      'Where required, Lamena relies on appropriate safeguards such as contractual data protection commitments and standard contractual clauses for international transfers.',
    ],
  },
  {
    title: 'Cookies and analytics',
    paragraphs: [
      'This website does not currently use advertising cookies, analytics pixels, A/B testing tools, embedded YouTube widgets, social tracking plugins or remarketing tags.',
      'The map button opens Google Maps in a separate website. Google may process data under its own privacy terms once you follow that external link.',
    ],
  },
  {
    title: 'Retention',
    paragraphs: [
      'Inquiry data is kept only as long as needed to respond, manage the business relationship and comply with legal duties. Inquiries are generally reviewed for deletion after 24 months unless longer retention is required.',
      'Technical logs are retained according to the applicable hosting and security provider settings.',
    ],
  },
  {
    title: 'Your rights',
    paragraphs: [
      'Depending on your location and applicable law, you may have the right to request access, rectification, deletion, restriction, portability, withdrawal of consent and objection to processing. You may also have the right to lodge a complaint with a competent data protection authority.',
      'Requests can be sent to info@lamena.ae. Lamena will respond within the legally required timeframe.',
    ],
  },
  {
    title: 'Security and updates',
    paragraphs: [
      'Lamena applies appropriate technical and organizational measures to protect personal data against unauthorized access, disclosure, alteration or loss.',
      'This Privacy Policy may be updated to reflect changes to the website, providers or legal requirements. Last updated: 3 June 2026.',
    ],
  },
]

const termsSections = [
  {
    title: 'Information about Lamena',
    paragraphs: ['Lamena FZE, Office LB19, LB192701WS17 Area 5.92, Jebel Ali Free Zone, Dubai, UAE.'],
  },
  {
    title: 'Use of this website',
    paragraphs: [
      'These terms set out the conditions under which you may access and use lamena.ae. By using the website, you agree to these terms. If you do not agree, please stop using the website.',
      'Lamena may update the website, these terms and the privacy information at any time. The latest version published on the website applies.',
    ],
  },
  {
    title: 'Website content',
    paragraphs: [
      'The content on this website is provided for general information only. It does not constitute professional, technical, legal, financial or other specialist advice. You should obtain appropriate advice before acting on any website content.',
      'Lamena makes reasonable efforts to keep information accurate and current, but does not guarantee that all content is complete, error-free or continuously available.',
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      'Lamena owns or licenses the content, design, trademarks, graphics and other materials on this website. You may not copy, modify, distribute, reproduce, publish or commercially use website content without written permission.',
    ],
  },
  {
    title: 'Availability and security',
    paragraphs: [
      'Access to the website is provided on a temporary basis. Lamena may suspend, withdraw or change all or part of the website without notice.',
      'You must not misuse the website by introducing malicious code, attempting unauthorized access, interfering with infrastructure or using the website in a way that breaches applicable law.',
    ],
  },
  {
    title: 'External links',
    paragraphs: [
      'This website may link to external websites or services. Such links are provided for convenience and do not imply endorsement. Lamena is not responsible for external content, availability or privacy practices.',
    ],
  },
  {
    title: 'Limitation of liability',
    paragraphs: [
      'To the extent permitted by law, Lamena excludes liability for losses arising from use of, inability to use, or reliance on this website or its content, including loss of profit, loss of business, interruption, goodwill or reputation.',
    ],
  },
  {
    title: 'Applicable law',
    paragraphs: [
      'These terms are governed by the laws of the Emirate of Dubai and applicable laws of the United Arab Emirates. The courts of Dubai have exclusive jurisdiction over disputes arising from these terms or use of the website.',
      'Last updated: 3 June 2026.',
    ],
  },
]

type IconCard = {
  icon: LucideIcon
  title: string
}

type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ContactFormState = {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  message: string
  consent: boolean
  website: string
}

const emptyContactForm: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  consent: false,
  website: '',
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy"
          element={<LegalPage eyebrow="Privacy & Legal" title="Privacy Policy" sections={privacySections} />}
        />
        <Route
          path="/terms"
          element={<LegalPage eyebrow="Terms" title="Terms & Conditions" sections={termsSections} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

function HomePage() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <OperatingModelSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Lamena home">
        <img src="/assets/lamena-logo.png" alt="Lamena" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} to={`/${item.href}`}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" to="/#contact">
        Inquiry
        <ArrowRight aria-hidden="true" />
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open && (
        <motion.nav
          className="mobile-nav"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {navItems.map((item) => (
            <Link key={item.href} to={`/${item.href}`} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/#contact" onClick={() => setOpen(false)}>
            Send inquiry
          </Link>
        </motion.nav>
      )}
    </header>
  )
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const patternY = useTransform(scrollYProgress, [0, 0.35], [0, -60])

  return (
    <section className="hero-section" id="home">
      <motion.div className="hero-pattern" style={{ y: prefersReducedMotion ? 0 : patternY }} aria-hidden="true" />

      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow">
            <Signal aria-hidden="true" />
            Security. Safety. Communication.
          </div>
          <img className="hero-logo" src="/assets/lamena-logo.png" alt="Lamena" />
          <h1>Strategic security and communication engineering.</h1>
          <p>
            Lamena connects technical expertise, market access and trusted delivery for organizations that
            operate in high-reliability environments.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/#contact">
              Send inquiry
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="secondary-button" to="/#services">
              Explore services
            </Link>
          </div>
        </motion.div>

        <Reveal className="hero-panel" delay={0.08}>
          <SignalConsole />
        </Reveal>
      </div>

      <div className="proof-strip" aria-label="Lamena key facts">
        {proofPoints.map((point) => (
          <div key={point.label}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SignalConsole() {
  const prefersReducedMotion = useReducedMotion()
  const nodes = [
    { x: '12%', y: '28%', label: 'A' },
    { x: '34%', y: '16%', label: 'B' },
    { x: '58%', y: '36%', label: 'C' },
    { x: '77%', y: '20%', label: 'D' },
    { x: '26%', y: '66%', label: 'E' },
    { x: '52%', y: '76%', label: 'F' },
    { x: '84%', y: '64%', label: 'G' },
  ]

  return (
    <div className="signal-console" aria-label="Animated system map">
      <div className="console-header">
        <div>
          <span>Operational map</span>
          <strong>Live coordination layer</strong>
        </div>
        <BadgeCheck aria-hidden="true" />
      </div>

      <div className="console-map">
        <div className="console-grid" aria-hidden="true" />
        <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M12 28 C25 12 44 18 58 36 S74 30 77 20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          />
          <motion.path
            d="M26 66 C39 48 48 62 52 76 S74 78 84 64"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
          />
          <motion.path
            d="M34 16 C38 38 44 58 52 76"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          />
        </svg>

        {!prefersReducedMotion && <motion.div className="scan-line" animate={{ x: ['-20%', '120%'] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'linear' }} />}

        {nodes.map((node, index) => (
          <motion.div
            className="map-node"
            key={node.label}
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
          >
            {node.label}
          </motion.div>
        ))}

        <motion.div
          className="pulse-core"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: prefersReducedMotion ? 1 : [1, 1.04, 1] }}
          transition={{ duration: 2.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        >
          <LockKeyhole aria-hidden="true" />
        </motion.div>
      </div>

      <div className="console-footer">
        <span>Security layer</span>
        <span>Safety protocol</span>
        <span>Communication path</span>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <Reveal className="section-heading">
        <span className="section-kicker">About</span>
        <h2>Your bridge to trust and security.</h2>
      </Reveal>

      <div className="about-layout">
        <Reveal className="about-lead">
          <p>
            With more than 20 years of experience in communication and security & safety engineering,
            Lamena offers extensive knowledge of technical requirements, comprehensive security solutions,
            high-quality advice and professional training.
          </p>
          <p>
            Through strategic partnerships with top equipment manufacturers, Lamena supports governmental
            authorities, communication service providers and organizations with demanding technical
            applications.
          </p>
        </Reveal>

        <div className="expertise-stack">
          {expertiseItems.map((item, index) => (
            <Reveal className="expertise-card" key={item.title} delay={index * 0.07}>
              <item.icon aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <Reveal className="section-heading centered">
        <span className="section-kicker">Services</span>
        <h2>Lean advisory, technical mediation and project delivery.</h2>
        <p>
          Lamena supports clients from early market analysis to turnkey implementation, keeping the service
          model focused, senior and practical.
        </p>
      </Reveal>

      <div className="service-columns">
        <ServiceColumn title="Mediation areas" items={mediationAreas} />
        <ServiceColumn title="Consulting areas" items={consultingAreas} />
      </div>
    </section>
  )
}

function ServiceColumn({ title, items }: { title: string; items: IconCard[] }) {
  return (
    <Reveal className="service-column">
      <h3>{title}</h3>
      <div className="service-list">
        {items.map((item, index) => (
          <motion.article className="service-card" key={item.title} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <item.icon aria-hidden="true" />
            <h4>{item.title}</h4>
          </motion.article>
        ))}
      </div>
    </Reveal>
  )
}

function PortfolioSection() {
  return (
    <section className="section portfolio-section" id="portfolio">
      <Reveal className="section-heading centered">
        <span className="section-kicker">Portfolio</span>
        <h2>Focused expertise for organizations where reliability matters.</h2>
      </Reveal>

      <div className="portfolio-grid">
        {portfolioCards.map((card, index) => (
          <Reveal className="portfolio-card" key={card.title} delay={index * 0.07}>
            <MiniGraphic type={card.type} />
            <div className="portfolio-body">
              <card.icon aria-hidden="true" />
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function MiniGraphic({ type }: { type: string }) {
  return (
    <div className={`mini-graphic ${type}`} aria-hidden="true">
      <div className="mini-grid" />
      <motion.div className="mini-line one" animate={{ scaleX: [0.35, 1, 0.35] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="mini-line two" animate={{ scaleX: [1, 0.45, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="mini-node a" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.8, repeat: Infinity }} />
      <motion.div className="mini-node b" animate={{ opacity: [1, 0.55, 1] }} transition={{ duration: 3.4, repeat: Infinity }} />
      <motion.div className="mini-node c" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 4.2, repeat: Infinity }} />
    </div>
  )
}

function OperatingModelSection() {
  return (
    <section className="operating-section" aria-label="Lamena operating model">
      <Reveal className="section-heading">
        <span className="section-kicker">Operating model</span>
        <h2>Simple structure for complex environments.</h2>
        <p>
          The work is designed around clarity: understand the environment, connect the right partners and
          deliver with technical discipline.
        </p>
      </Reveal>

      <div className="operating-steps">
        {operatingSteps.map((step, index) => (
          <Reveal className="operating-card" key={step.title} delay={index * 0.08}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  const mapUrl =
    'https://www.google.com/maps/search/?api=1&query=Lamena%20FZE%20Jebel%20Ali%20Free%20Zone%20Dubai%20UAE'

  return (
    <section className="section contact-section" id="contact">
      <Reveal className="section-heading centered">
        <span className="section-kicker">Contact</span>
        <h2>Start a focused conversation with Lamena.</h2>
        <p>Send a structured inquiry and the details will be delivered to Lamena for review.</p>
      </Reveal>

      <div className="contact-layout">
        <Reveal className="contact-card">
          <img src="/assets/lamena-logo.png" alt="Lamena" />
          <div className="contact-row">
            <MapPin aria-hidden="true" />
            <p>
              <strong>Lamena FZE</strong>
              <span>Office LB19, LB192701WS17 Area 5.92</span>
              <span>Jebel Ali Free Zone, Dubai, UAE</span>
            </p>
          </div>
          <a className="contact-row link-row" href="https://lamena.ae" target="_blank" rel="noreferrer">
            <Globe aria-hidden="true" />
            <span>Lamena.ae</span>
            <ExternalLink aria-hidden="true" />
          </a>
          <a className="contact-row link-row" href={mapUrl} target="_blank" rel="noreferrer">
            <Compass aria-hidden="true" />
            <span>Open location</span>
            <ExternalLink aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal className="form-panel" delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(emptyContactForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, type, value } = event.target
    const nextValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setForm((current) => ({ ...current, [name]: nextValue }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload.message || 'The inquiry could not be sent.')
      }

      setStatus('sent')
      setMessage('Thank you. Your inquiry has been sent to Lamena.')
      setForm(emptyContactForm)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The inquiry could not be sent.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <Mail aria-hidden="true" />
        <div>
          <span>Website inquiry</span>
          <h3>Tell us about your project.</h3>
        </div>
      </div>

      <div className="form-grid">
        <label>
          First name
          <input name="firstName" value={form.firstName} onChange={updateField} autoComplete="given-name" required />
        </label>
        <label>
          Last name
          <input name="lastName" value={form.lastName} onChange={updateField} autoComplete="family-name" required />
        </label>
      </div>

      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required />
      </label>

      <div className="form-grid">
        <label>
          Company
          <input name="company" value={form.company} onChange={updateField} autoComplete="organization" />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" />
        </label>
      </div>

      <label>
        Message
        <textarea name="message" value={form.message} onChange={updateField} rows={5} required />
      </label>

      <label className="consent-row">
        <input name="consent" type="checkbox" checked={form.consent} onChange={updateField} required />
        <span>I agree that Lamena may process this inquiry to respond to my request.</span>
      </label>

      <label className="screen-reader-field" aria-hidden="true">
        Website
        <input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
      </label>

      <button className="primary-button submit-button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send inquiry'}
        <Send aria-hidden="true" />
      </button>

      <p className={`form-status ${status}`} aria-live="polite">
        {status === 'sent' && <CheckCircle2 aria-hidden="true" />}
        {status === 'error' && <AlertCircle aria-hidden="true" />}
        {message}
      </p>
    </form>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-brand">
        <img src="/assets/lamena-logo.png" alt="Lamena" />
      </Link>
      <div className="footer-links">
        <Link to="/privacy">Privacy & Legal</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/#home">Home</Link>
      </div>
      <span>Lamena © 2026</span>
    </footer>
  )
}

function LegalPage({ eyebrow, title, sections }: { eyebrow: string; title: string; sections: LegalSection[] }) {
  return (
    <div className="legal-shell">
      <Header />
      <main className="legal-main">
        <Reveal className="legal-panel">
          <span className="section-kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>
            {title === 'Privacy Policy'
              ? 'This Privacy Policy explains how personal data is processed when visitors use this website or submit an inquiry.'
              : 'These Terms & Conditions explain the rules for accessing and using the Lamena website.'}
          </p>
          <div className="legal-content">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <Link className="secondary-button" to="/">
            Back to Lamena
          </Link>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.hash.replace('#', '')
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
  }, [location.pathname, location.hash])

  return null
}

export default App
