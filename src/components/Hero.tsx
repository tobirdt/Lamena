import { ArrowRight, Signal } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { proofPoints } from '../data/content'
import { HeroMark } from './HeroMark'
import { Reveal } from './Reveal'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const patternY = useTransform(scrollYProgress, [0, 0.4], [0, -48])
  const glowY = useTransform(scrollYProgress, [0, 0.4], [0, 30])

  return (
    <section className="hero-section" id="home">
      <motion.div
        className="hero-pattern"
        style={{ y: prefersReducedMotion ? 0 : patternY }}
        aria-hidden="true"
      />
      <motion.div
        className="hero-glow"
        style={{ y: prefersReducedMotion ? 0 : glowY }}
        aria-hidden="true"
      />

      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Signal aria-hidden="true" />
            Security. Safety. Communication.
          </motion.div>

          <motion.picture
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <source srcSet="/assets/lamena-logo.webp" type="image/webp" />
            <img
              className="hero-logo"
              src="/assets/lamena-logo.png"
              alt="Lamena"
              width={300}
              height={84}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.picture>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            Strategic security and communication engineering.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            Lamena connects technical expertise, global market access and trusted delivery for
            governmental authorities, security organizations and communication providers worldwide.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link className="primary-button" to="/#contact">
              Send inquiry
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="secondary-button" to="/#services">
              Explore services
            </Link>
          </motion.div>
        </motion.div>

        <Reveal className="hero-panel" delay={0.14}>
          <HeroMark />
        </Reveal>
      </div>

      <motion.div
        className="proof-strip"
        aria-label="Lamena key facts"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
      >
        {proofPoints.map((point) => (
          <div key={point.label}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
