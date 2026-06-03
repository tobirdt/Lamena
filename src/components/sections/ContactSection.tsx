import { Compass, ExternalLink, Globe, Mail, MapPin } from 'lucide-react'
import { MAP_URL } from '../../data/content'
import { SITE_URL } from '../../lib/site'
import { BrandLogo } from '../BrandLogo'
import { ContactForm } from '../ContactForm'
import { Reveal } from '../Reveal'

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <Reveal className="section-heading centered">
        <span className="section-kicker">Contact</span>
        <h2>Start a focused conversation with Lamena.</h2>
        <p>Send a structured inquiry and the details will be delivered to Lamena for review.</p>
      </Reveal>

      <div className="contact-layout">
        <Reveal className="contact-card">
          <BrandLogo />
          <div className="contact-row">
            <MapPin aria-hidden="true" />
            <p>
              <strong>Lamena FZE</strong>
              <span>Office LB19, LB192701WS17 Area 5.92</span>
              <span>Jebel Ali Free Zone, Dubai, UAE</span>
            </p>
          </div>
          <a className="contact-row link-row" href={SITE_URL} target="_blank" rel="noreferrer">
            <Globe aria-hidden="true" />
            <span>Lamena.ae</span>
            <ExternalLink aria-hidden="true" />
          </a>
          <a className="contact-row link-row" href="mailto:info@lamena.ae">
            <Mail aria-hidden="true" />
            <span>info@lamena.ae</span>
          </a>
          <a className="contact-row link-row" href={MAP_URL} target="_blank" rel="noreferrer">
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
