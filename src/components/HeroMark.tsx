import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

// Three circles form an equilateral-ish triangle composition.
// Centroid (triple-intersection center): approx (210, 187)
const CIRCLES = [
  { cx: 148, cy: 158, delay: 0 },
  { cx: 272, cy: 158, delay: 0.28 },
  { cx: 210, cy: 244, delay: 0.56 },
]

const LABELS = [
  { text: 'Security',       x: 148, y: 42,  anchor: 'middle' as const },
  { text: 'Safety',         x: 272, y: 42,  anchor: 'middle' as const },
  { text: 'Communication',  x: 210, y: 382, anchor: 'middle' as const },
]

const R = 112
const CX = 210
const CY = 187
// Outer instrument ring radius
const RING = 178

// 24 tick marks around the instrument ring
const TICKS = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2
  const isMajor = i % 6 === 0
  const r1 = RING - (isMajor ? 7 : 4)
  return {
    x1: CX + r1 * Math.cos(angle),
    y1: CY + r1 * Math.sin(angle),
    x2: CX + RING * Math.cos(angle),
    y2: CY + RING * Math.sin(angle),
    isMajor,
  }
})

export function HeroMark() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 398"
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

      {/* Instrument ring — dashed orbit + tick marks, slow rotation */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <motion.g
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          animate={inView && !reduced ? { rotate: 360 } : {}}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx={CX} cy={CY} r={RING}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="0.7"
            strokeDasharray="1 7"
          />
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.isMajor ? 'rgba(195,172,235,0.35)' : 'rgba(255,255,255,0.14)'}
              strokeWidth={t.isMajor ? 1 : 0.6}
            />
          ))}
        </motion.g>
      </motion.g>

      {/* Circles — animated path draw-in */}
      {CIRCLES.map((c, i) => (
        <motion.circle
          key={i}
          cx={c.cx} cy={c.cy} r={R}
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.1"
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
        cx={CX} cy={CY} rx="62" ry="52"
        fill="url(#hm-glow)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.9 }}
      />

      {/* Inner core highlight */}
      <motion.ellipse
        cx={CX} cy={CY} rx="28" ry="24"
        fill="url(#hm-core)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.1 }}
      />

      {/* Center crosshair */}
      <motion.g
        stroke="rgba(195,172,235,0.55)"
        strokeWidth="0.8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.25 }}
      >
        <line x1={CX - 10} y1={CY} x2={CX - 4} y2={CY} />
        <line x1={CX + 4} y1={CY} x2={CX + 10} y2={CY} />
        <line x1={CX} y1={CY - 10} x2={CX} y2={CY - 4} />
        <line x1={CX} y1={CY + 4} x2={CX} y2={CY + 10} />
      </motion.g>

      {/* Center dot — subtle pulse */}
      <motion.circle
        cx={CX} cy={CY} r="3.5"
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
          fill="rgba(255,255,255,0.5)"
          fontSize="10"
          fontFamily="'IBM Plex Mono', ui-monospace, monospace"
          fontWeight="500"
          letterSpacing="0.16em"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.85 + i * 0.12 }}
        >
          {l.text.toUpperCase()}
        </motion.text>
      ))}

      {/* Thin tick-mark lines from labels to circle top/bottom */}
      {[
        { x1: 148, y1: 46, x2: 148, y2: 58 },
        { x1: 272, y1: 46, x2: 272, y2: 58 },
        { x1: 210, y1: 375, x2: 210, y2: 363 },
      ].map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke="rgba(255,255,255,0.24)"
          strokeWidth="0.7"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
        />
      ))}
    </svg>
  )
}
