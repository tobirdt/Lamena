import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { DUR_REVEAL, EASE_OUT } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}

/**
 * Base entrance primitive. Besides the fade-up it exposes an `is-inview`
 * class (plus the constant `rv` marker) so CSS can choreograph INNER details
 * — kicker hairlines, indices — together with the content. The framer
 * wrapper keeps its inline opacity; inner choreography never targets it.
 */
export function Reveal({ children, className, delay = 0, distance = 14 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const [seen, setSeen] = useState(false)

  if (prefersReducedMotion) {
    return <div className={`rv is-inview${className ? ` ${className}` : ''}`}>{children}</div>
  }

  return (
    <motion.div
      className={`rv${seen ? ' is-inview' : ''}${className ? ` ${className}` : ''}`}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      onViewportEnter={() => setSeen(true)}
      transition={{ duration: DUR_REVEAL, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
