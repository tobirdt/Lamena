import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DUR_REVEAL, EASE_OUT } from '../lib/motion'
import { HeroMark } from './HeroMark'
import { MaskReveal } from './MaskReveal'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const staticEnter = prefersReducedMotion ? false : undefined

  return (
    <section className="hero-section" id="home">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={staticEnter ?? { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR_REVEAL, ease: EASE_OUT }}
        >
          <div className="hero-kicker">Security · Safety · Communication</div>

          <h1>
            <MaskReveal trigger="load" delay={0.12}>
              Strategic security and communication engineering.
            </MaskReveal>
          </h1>

          <p>Technical expertise, global partnerships, trusted delivery.</p>

          <div className="hero-actions">
            <Link className="primary-button" to="/#contact">
              Send inquiry
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="hero-text-link" to="/#services">
              Explore services
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="hero-panel"
          initial={staticEnter ?? { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR_REVEAL, delay: 0.15, ease: EASE_OUT }}
        >
          <HeroMark />
        </motion.div>
      </div>
    </section>
  )
}
