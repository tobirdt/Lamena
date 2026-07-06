import { motion, useReducedMotion } from 'framer-motion'
import { consultingAreas, mediationAreas } from '../../data/content'
import { EASE_OUT } from '../../lib/motion'
import type { ServiceArea } from '../../types/content'
import { Reveal } from '../Reveal'

function ServiceColumn({ title, items, baseDelay = 0 }: { title: string; items: ServiceArea[]; baseDelay?: number }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Reveal className="service-column" delay={baseDelay}>
      <header className="service-column-head">
        <h3>{title}</h3>
        <span>{String(items.length).padStart(2, '0')} areas</span>
      </header>
      {/* list-style:none strips the list role in Safari — restore it */}
      <ol className="service-index" role="list">
        {items.map((item, index) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{
              duration: 0.4,
              delay: baseDelay + index * 0.05,
              ease: EASE_OUT,
              ...(prefersReducedMotion ? { duration: 0.001 } : {}),
            }}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h4>{item.title}</h4>
          </motion.li>
        ))}
      </ol>
    </Reveal>
  )
}

export function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <Reveal className="section-heading split">
        <div>
          <span className="section-kicker">Services</span>
          <h2>Lean advisory, technical mediation and project delivery.</h2>
        </div>
        <p>
          Lamena supports clients across the security &amp; safety, defense and communication
          industries — and beyond — from early market analysis through to turnkey project delivery.
          The service model is focused, senior and built around practical results.
        </p>
      </Reveal>

      <div className="service-columns">
        <ServiceColumn title="Mediation" items={mediationAreas} baseDelay={0.06} />
        <ServiceColumn title="Consulting" items={consultingAreas} baseDelay={0.12} />
      </div>
    </section>
  )
}
