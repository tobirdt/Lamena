import { motion, useReducedMotion } from 'framer-motion'
import { expertiseItems } from '../../data/content'
import { EASE_OUT } from '../../lib/motion'
import { Reveal } from '../Reveal'

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section about-section" id="about">
      <Reveal className="section-heading">
        <span className="section-kicker">About</span>
        <h2>Your bridge to trust and security.</h2>
      </Reveal>

      <div className="about-layout">
        <Reveal className="about-lead" delay={0.06}>
          <p>
            With more than 20 years of experience in communication and security &amp; safety
            engineering, Lamena delivers comprehensive security solutions, high-quality technical
            advice and professional training to clients across government, defense, industry and
            the private sector.
          </p>
          <p>
            Through strategic partnerships with leading equipment manufacturers, Lamena provides
            unrivalled technological solutions and services to governmental authorities, regulatory
            authorities, communication service providers and organizations operating in technically
            demanding and sensitive environments — from initial consulting through to turnkey
            delivery and after-sales support.
          </p>
        </Reveal>

        <div className="expertise-stack">
          {expertiseItems.map((item, index) => (
            <motion.div
              className="expertise-card"
              key={item.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: 0.06 + index * 0.07,
                ease: EASE_OUT,
                ...(prefersReducedMotion ? { duration: 0.001 } : {}),
              }}
            >
              <item.icon aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
