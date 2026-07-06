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
          <p className="about-statement">
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

        {/* list-style:none strips the list role in Safari — restore it */}
        <ol className="expertise-list" role="list">
          {expertiseItems.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.45,
                delay: 0.08 + index * 0.08,
                ease: EASE_OUT,
                ...(prefersReducedMotion ? { duration: 0.001 } : {}),
              }}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
