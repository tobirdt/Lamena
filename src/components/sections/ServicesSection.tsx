import { motion, useReducedMotion } from 'framer-motion'
import { consultingAreas, mediationAreas } from '../../data/content'
import { EASE_OUT } from '../../lib/motion'
import type { IconCard } from '../../types/content'
import { Reveal } from '../Reveal'

function ServiceColumn({ title, items, baseDelay = 0 }: { title: string; items: IconCard[]; baseDelay?: number }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Reveal className="service-column" delay={baseDelay}>
      <h3>{title}</h3>
      <div className="service-list">
        {items.map((item, index) => (
          <motion.article
            className="service-card"
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{
              duration: 0.45,
              delay: baseDelay + index * 0.05,
              ease: EASE_OUT,
              ...(prefersReducedMotion ? { duration: 0.001 } : {}),
            }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <item.icon aria-hidden="true" />
            <h4>{item.title}</h4>
          </motion.article>
        ))}
      </div>
    </Reveal>
  )
}

export function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <Reveal className="section-heading centered">
        <span className="section-kicker">Services</span>
        <h2>Lean advisory, technical mediation and project delivery.</h2>
        <p>
          Lamena supports clients across the security &amp; safety, defense and communication
          industries — and beyond — from early market analysis through to turnkey project delivery.
          The service model is focused, senior and built around practical results.
        </p>
      </Reveal>

      <div className="service-columns">
        <ServiceColumn title="Mediation areas" items={mediationAreas} baseDelay={0.06} />
        <ServiceColumn title="Consulting areas" items={consultingAreas} baseDelay={0.12} />
      </div>
    </section>
  )
}
