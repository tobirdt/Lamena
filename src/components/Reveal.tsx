import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DUR_REVEAL, EASE_OUT, REVEAL_VIEWPORT } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}

/** The single entrance primitive — one calm fade-up per block, once. */
export function Reveal({ children, className, delay = 0, distance = 10 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: DUR_REVEAL, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
