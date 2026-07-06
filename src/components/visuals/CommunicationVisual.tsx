import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

// Network nodes distributed across the canvas
const NODES = [
  { x: 68,  y: 54,  id: 'NODE-A' },
  { x: 332, y: 46,  id: 'NODE-B' },
  { x: 355, y: 158, id: 'NODE-C' },
  { x: 55,  y: 168, id: 'NODE-D' },
  { x: 192, y: 176, id: 'NODE-E' },
]

// Center antenna position
const CX = 200
const CY = 98

// Connections between nodes and center
const CONNECTIONS = [
  { x1: CX, y1: CY, x2: 68,  y2: 54  },
  { x1: CX, y1: CY, x2: 332, y2: 46  },
  { x1: CX, y1: CY, x2: 355, y2: 158 },
  { x1: CX, y1: CY, x2: 55,  y2: 168 },
  { x1: CX, y1: CY, x2: 192, y2: 176 },
  { x1: 68, y1: 54, x2: 332, y2: 46  },
]

export function CommunicationVisual() {
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
        <pattern id="cv-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24,0 L0,0 L0,24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="cv-glow" cx="50%" cy="44%" r="52%">
          <stop offset="0%" stopColor="#6f4d92" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6f4d92" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cv-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6f4d92" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6f4d92" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="220" fill="#0d0b14" />
      <rect width="400" height="220" fill="url(#cv-grid)" />
      <ellipse cx={CX} cy={CY} rx="195" ry="115" fill="url(#cv-glow)" />

      {/* Expanding signal rings — 4 staggered waves */}
      {!reduced && [0, 0.75, 1.5, 2.25].map((delay, i) => (
        <motion.circle
          key={i}
          cx={CX} cy={CY} r={20}
          fill="none"
          stroke="#6f4d92"
          strokeWidth="0.9"
          animate={inView ? {
            r: [20, 115],
            opacity: [0.55, 0],
          } : {}}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: 'easeOut',
            repeatDelay: 0,
          }}
        />
      ))}

      {/* Static inner ring — always visible */}
      <motion.circle
        cx={CX} cy={CY} r={22}
        fill="rgba(111,77,146,0.1)"
        stroke="#6f4d92" strokeWidth="0.8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      {/* Connection lines — animated path draw-in */}
      {CONNECTIONS.map((c, i) => (
        <motion.line
          key={i}
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="rgba(111,77,146,0.35)" strokeWidth="0.6"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Animated data packet on first connection */}
      {!reduced && inView && (
        <motion.circle
          r="2.5"
          fill="#a78bcb"
          animate={{
            x: [CX, 68],
            y: [CY, 54],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
        />
      )}

      {/* Network nodes */}
      {NODES.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.7 + i * 0.1 }}
        >
          <circle cx={node.x} cy={node.y} r="7" fill="rgba(111,77,146,0.12)" stroke="#6f4d92" strokeWidth="0.7" />
          <circle cx={node.x} cy={node.y} r="2.5" fill="#8b66b8" />
          <text
            x={node.x}
            y={node.y + 16}
            fill="rgba(255,255,255,0.28)"
            fontSize="6.5"
            fontFamily="'IBM Plex Mono', ui-monospace, monospace"
            textAnchor="middle"
          >
            {node.id}
          </text>
        </motion.g>
      ))}

      {/* Center antenna icon */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {/* Dish */}
        <path
          d={`M${CX - 12},${CY + 4} Q${CX},${CY - 14} ${CX + 12},${CY + 4}`}
          fill="none" stroke="#b09fd0" strokeWidth="1.6" strokeLinecap="round"
        />
        {/* Mast */}
        <line x1={CX} y1={CY + 4} x2={CX} y2={CY + 14} stroke="#b09fd0" strokeWidth="1.4" strokeLinecap="round" />
        {/* Base */}
        <line x1={CX - 8} y1={CY + 14} x2={CX + 8} y2={CY + 14} stroke="#b09fd0" strokeWidth="1.4" strokeLinecap="round" />
        {/* Focal point */}
        <circle cx={CX} cy={CY - 2} r="1.8" fill="#b09fd0" />
      </motion.g>

      {/* Header */}
      <text
        x="14" y="16"
        fill="rgba(255,255,255,0.28)" fontSize="7.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" letterSpacing="0.09em"
      >
        SIGNAL MAP · NETWORK TOPOLOGY
      </text>
      <motion.circle
        cx="383" cy="12" r="3.5" fill="#4ade80"
        animate={inView && !reduced ? { fillOpacity: [0.9, 0.3, 0.9] } : {}}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />
      <text x="376" y="16" fill="rgba(255,255,255,0.28)" fontSize="7" fontFamily="'IBM Plex Mono', ui-monospace, monospace" textAnchor="end">
        LIVE
      </text>

      {/* Bottom bar */}
      <rect x="0" y="200" width="400" height="20" fill="rgba(10,8,18,0.85)" />
      <rect x="0" y="200" width="400" height="0.7" fill="rgba(111,77,146,0.22)" />
      <motion.text
        x="14" y="213"
        fill="rgba(255,255,255,0.24)" fontSize="6.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" letterSpacing="0.08em"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        5 NODES CONNECTED · 6 PATHS ACTIVE · BANDWIDTH: NOMINAL
      </motion.text>
    </svg>
  )
}
