import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

// Nodes positioned on r=88 circle from center (200, 110)
const STATUS_NODES = [
  { angle: -80, id: 'SCA-01', ok: true },
  { angle: -28, id: 'COM-A1', ok: true },
  { angle: 32,  id: 'SCA-02', ok: true },
  { angle: 95,  id: 'COM-B2', ok: false },
  { angle: 152, id: 'SCA-03', ok: true },
  { angle: -138, id: 'SEC-04', ok: true },
]

function nodePos(angle: number, r = 88) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: 200 + r * Math.cos(rad), y: 110 + r * Math.sin(rad) }
}

export function SecurityVisual() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const reduced = useReducedMotion()

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="portfolio-svg"
    >
      <defs>
        <pattern id="sv-dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="0.5" cy="0.5" r="0.6" fill="rgba(255,255,255,0.065)" />
        </pattern>
        <radialGradient id="sv-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#6f4d92" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6f4d92" stopOpacity="0" />
        </radialGradient>
        <clipPath id="sv-clip">
          <rect width="400" height="220" />
        </clipPath>
        <linearGradient id="sv-sweep" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(-15,0.5,0.5)">
          <stop offset="0%" stopColor="#8b66b8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#8b66b8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="220" fill="#0d0b14" />
      <rect width="400" height="220" fill="url(#sv-dots)" />
      <ellipse cx="200" cy="110" rx="190" ry="115" fill="url(#sv-glow)" />

      {/* Concentric rings */}
      {([35, 62, 88] as const).map((r, i) => (
        <motion.circle
          key={r}
          cx="200" cy="110" r={r}
          fill="none"
          stroke="#6f4d92"
          strokeWidth={i === 0 ? 0.9 : 0.55}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0.7 - i * 0.18, 0.38 - i * 0.09, 0.7 - i * 0.18] } : { opacity: 0 }}
          transition={{ duration: 3.2, delay: 0.2 + i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Rotating scanner beam */}
      {!reduced && (
        <motion.g
          clipPath="url(#sv-clip)"
          animate={inView ? { rotate: [0, 360] } : {}}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 110px' }}
        >
          {/* Cone fill — 70° sweep from 0° to 70° (pointing up) */}
          <path
            d="M200,110 L200,22 A88,88 0 0,1 282.7,87.2 Z"
            fill="url(#sv-sweep)"
          />
          {/* Leading edge line */}
          <line
            x1="200" y1="110" x2="200" y2="22"
            stroke="#8b66b8" strokeWidth="0.9" strokeOpacity="0.75"
          />
        </motion.g>
      )}

      {/* Center secure node */}
      <motion.circle
        cx="200" cy="110" r="21"
        fill="rgba(111,77,146,0.15)" stroke="#6f4d92" strokeWidth="0.9"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Lock shackle */}
        <path
          d="M195,108 C195,103 205,103 205,108"
          fill="none" stroke="#b09fd0" strokeWidth="1.3" strokeLinecap="round"
        />
        {/* Lock body */}
        <rect x="192" y="108" width="16" height="11" rx="2" fill="none" stroke="#b09fd0" strokeWidth="1.3" />
        <circle cx="200" cy="114" r="2" fill="#b09fd0" />
      </motion.g>

      {/* Status nodes with dashed lines from center */}
      {STATUS_NODES.map((node, i) => {
        const { x, y } = nodePos(node.angle)
        const color = node.ok ? '#4ade80' : '#f59e0b'
        const isRight = x > 200
        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.35, delay: 0.6 + i * 0.09 }}
          >
            <line
              x1="200" y1="110" x2={x} y2={y}
              stroke="rgba(111,77,146,0.22)" strokeWidth="0.5" strokeDasharray="3 3"
            />
            <circle cx={x} cy={y} r="5.5" fill={color + '18'} stroke={color} strokeWidth="0.8" />
            <circle cx={x} cy={y} r="2" fill={color} />
            <text
              x={isRight ? x + 9 : x - 9}
              y={y + 1}
              fill="rgba(255,255,255,0.32)"
              fontSize="6.5"
              fontFamily="'IBM Plex Mono', ui-monospace, monospace"
              textAnchor={isRight ? 'start' : 'end'}
              dominantBaseline="middle"
            >
              {node.id}
            </text>
            {/* Blinking dot for warning */}
            {!node.ok && (
              <motion.circle
                cx={x} cy={y} r="5.5"
                fill="none" stroke={color} strokeWidth="0.8"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
          </motion.g>
        )
      })}

      {/* Header row */}
      <text
        x="14" y="16"
        fill="rgba(255,255,255,0.28)" fontSize="7.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" letterSpacing="0.09em"
      >
        THREAT ANALYSIS · REALTIME
      </text>
      <motion.circle
        cx="383" cy="12" r="3.5" fill="#4ade80"
        animate={inView && !reduced ? { fillOpacity: [0.9, 0.3, 0.9] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <text x="376" y="16" fill="rgba(255,255,255,0.28)" fontSize="7" fontFamily="'IBM Plex Mono', ui-monospace, monospace" textAnchor="end">
        SECURE
      </text>

      {/* Bottom status bar */}
      <rect x="0" y="200" width="400" height="20" fill="rgba(10,8,18,0.85)" />
      <rect x="0" y="200" width="400" height="0.7" fill="rgba(111,77,146,0.22)" />
      <motion.text
        x="14" y="213"
        fill="rgba(255,255,255,0.24)" fontSize="6.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" letterSpacing="0.08em"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
      >
        5/6 NODES ACTIVE · ZONE STATUS: NOMINAL · PERIMETER: CLEAR
      </motion.text>
    </svg>
  )
}
