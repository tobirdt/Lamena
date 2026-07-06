import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { proofPoints } from '../data/content'
import { EASE_OUT } from '../lib/motion'
import { HeroMark } from './HeroMark'
import { Reveal } from './Reveal'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const patternY = useTransform(scrollYProgress, [0, 0.4], [0, -48])
  const glowY = useTransform(scrollYProgress, [0, 0.4], [0, 30])
  const staticEnter = prefersReducedMotion ? false : undefined

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
          initial={staticEnter ?? { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: EASE_OUT }}
        >
          <motion.div
            className="hero-kicker"
            initial={staticEnter ?? { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
          >
            Security · Safety · Communication
          </motion.div>

          <motion.picture
            initial={staticEnter ?? { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT }}
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
            initial={staticEnter ?? { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE_OUT }}
          >
            Strategic security and communication engineering.
          </motion.h1>

          <motion.p
            initial={staticEnter ?? { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT }}
          >
            Connecting technical expertise, global partnerships and trusted delivery
            for demanding environments worldwide.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={staticEnter ?? { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36, ease: EASE_OUT }}
          >
            <Link className="primary-button" to="/#contact">
              Send inquiry
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="secondary-button" to="/#services">
              Explore services
            </Link>
          </motion.div>

          <motion.dl
            className="hero-proof"
            initial={staticEnter ?? { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.46, ease: EASE_OUT }}
          >
            {proofPoints.map((point) => (
              <div key={point.label}>
                <dt>{point.label}</dt>
                <dd>{point.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <Reveal className="hero-panel" delay={0.12}>
          <HeroMark />
        </Reveal>
      </div>

      <motion.div
        className="hero-scroll-cue-wrap"
        initial={staticEnter ?? { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
      >
        <Link className="hero-scroll-cue" to="/#about" aria-label="Scroll to About section">
          <span aria-hidden="true">Scroll</span>
          <i aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
