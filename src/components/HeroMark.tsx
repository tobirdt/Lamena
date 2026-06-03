import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

// Three circles form an equilateral-ish triangle composition.
// Centroid (triple-intersection center): approx (210, 167)
const CIRCLES = [
  { cx: 148, cy: 138, delay: 0 },
  { cx: 272, cy: 138, delay: 0.28 },
  { cx: 210, cy: 224, delay: 0.56 },
]

const LABELS = [
  { text: 'Security',       x: 148, y: 22,  anchor: 'middle' as const },
  { text: 'Safety',         x: 272, y: 22,  anchor: 'middle' as const },
  { text: 'Communication',  x: 210, y: 362, anchor: 'middle' as const },
]

const R = 112

export function HeroMark() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 378"
      className="hero-mark"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b66b8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b66b8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hm-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bcb" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6f4d92" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circles — animated path draw-in */}
      {CIRCLES.map((c, i) => (
        <motion.circle
          key={i}
          cx={c.cx} cy={c.cy} r={R}
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: {
              duration: reduced ? 0.001 : 1.4,
              delay: c.delay,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: { duration: 0.3, delay: c.delay },
          }}
        />
      ))}

      {/* Subtle fill glow at triple-intersection center */}
      <motion.ellipse
        cx="210" cy="167" rx="62" ry="52"
        fill="url(#hm-glow)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.9 }}
      />

      {/* Inner core highlight */}
      <motion.ellipse
        cx="210" cy="167" rx="28" ry="24"
        fill="url(#hm-core)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.1 }}
      />

      {/* Center dot — subtle pulse */}
      <motion.circle
        cx="210" cy="167" r="3.5"
        fill="#a78bcb"
        initial={{ opacity: 0 }}
        animate={inView
          ? { opacity: reduced ? 0.7 : [0, 0.9, 0.55, 0.9] }
          : { opacity: 0 }
        }
        transition={{
          duration: 2.8,
          delay: 1.2,
          repeat: reduced ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Labels — appear after circles */}
      {LABELS.map((l, i) => (
        <motion.text
          key={l.text}
          x={l.x} y={l.y}
          textAnchor={l.anchor}
          fill="rgba(255,255,255,0.44)"
          fontSize="10"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight="600"
          letterSpacing="0.14em"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.85 + i * 0.12 }}
        >
          {l.text.toUpperCase()}
        </motion.text>
      ))}

      {/* Thin tick-mark lines from labels to circle top/bottom */}
      {[
        { x1: 148, y1: 26, x2: 148, y2: 38 },
        { x1: 272, y1: 26, x2: 272, y2: 38 },
        { x1: 210, y1: 355, x2: 210, y2: 343 },
      ].map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.7"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
        />
      ))}
    </svg>
  )
}
