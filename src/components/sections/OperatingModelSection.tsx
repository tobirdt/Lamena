import { motion, useReducedMotion } from 'framer-motion'
import { operatingSteps } from '../../data/content'
import { Reveal } from '../Reveal'

export function OperatingModelSection() {
  const prefersReducedMotion = useReducedMotion()

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

      <div className="operating-steps">
        {operatingSteps.map((step, index) => (
          <motion.div
            className="operating-card"
            key={step.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
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
