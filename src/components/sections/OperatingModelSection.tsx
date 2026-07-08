import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { operatingSteps } from '../../data/content'
import { EASE_OUT } from '../../lib/motion'
import { useEntrance } from '../../lib/useEntrance'
import { Reveal } from '../Reveal'

export function OperatingModelSection() {
  const prefersReducedMotion = useReducedMotion()
  const stepsRef = useRef<HTMLDivElement>(null)
  // Connector line ("string of pearls") draws in WITH the step blocks
  const entrance = useEntrance(true, stepsRef, '-60px')

  return (
    <section className="operating-section" aria-label="Lamena operating model">
      <Reveal className="section-heading">
        <span className="section-kicker">Operating model</span>
        <h2>Simple structure for complex environments.</h2>
        <p>
          The work is designed around clarity: understand the environment, connect the right
          partners and deliver with technical discipline.
        </p>
      </Reveal>

      <div ref={stepsRef} className={`operating-steps${entrance}`}>
        {operatingSteps.map((step, index) => (
          <motion.div
            className="operating-card"
            key={step.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.52,
              delay: index * 0.1,
              ease: EASE_OUT,
              ...(prefersReducedMotion ? { duration: 0.001 } : {}),
            }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
