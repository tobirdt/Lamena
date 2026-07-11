import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

type MaskRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** 'load' animates on mount (hero); 'inview' animates on scroll entry. */
  trigger?: 'load' | 'inview'
}

/**
 * Editorial mask reveal — the content rises from behind a clipped edge.
 * The outer span clips (overflow: hidden, with breathing room so
 * descenders/accents never get cut); the inner span carries the motion.
 * Reduced motion renders the finished state.
 */
export function MaskReveal({ children, className, delay = 0, trigger = 'inview' }: MaskRevealProps) {
  const reduced = useReducedMotion()

  // Renders <span> (with display: block via CSS), not <div> — this gets
  // wrapped around heading text, and headings only permit phrasing content.
  if (reduced) {
    return <span className={`mask-reveal ${className ?? ''}`.trim()}>{children}</span>
  }

  const motionProps =
    trigger === 'load'
      ? { initial: { y: '115%' }, animate: { y: 0 } }
      : {
          initial: { y: '115%' },
          whileInView: { y: 0 },
          viewport: { once: true, margin: '-64px' } as const,
        }

  return (
    <span className={`mask-reveal ${className ?? ''}`.trim()}>
      <motion.span
        className="mask-reveal-inner"
        {...motionProps}
        transition={{ duration: 0.72, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
  )
}
