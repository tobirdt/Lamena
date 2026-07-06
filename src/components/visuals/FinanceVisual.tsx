import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

// Line chart data points — gentle upward trend
const POINTS: [number, number][] = [
  [34,  166],
  [82,  155],
  [128, 144],
  [174, 136],
  [220, 125],
  [268, 113],
  [316, 106],
  [366,  92],
]

function toPath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
}

function toArea(pts: [number, number][]) {
  return `${toPath(pts)} L${pts[pts.length - 1][0]},190 L${pts[0][0]},190 Z`
}

const KPI = [
  { label: 'Revenue growth', value: '+24%', color: '#4ade80' },
  { label: 'Efficiency index', value: '+18%', color: '#818cf8' },
  { label: 'Project delivery', value: '98%',  color: '#a78bcb' },
]

export function FinanceVisual() {
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
        <pattern id="fv-hlines" x="0" y="0" width="400" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="fv-glow" cx="75%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#6f4d92" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6f4d92" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fv-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6f4d92" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6f4d92" stopOpacity="0" />
        </linearGradient>
        <clipPath id="fv-chart-clip">
          <rect x="24" y="68" width="352" height="130" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="400" height="220" fill="#0d0b14" />
      <rect x="24" y="68" width="352" height="130" fill="url(#fv-hlines)" />
      <rect width="400" height="220" fill="url(#fv-glow)" />

      {/* KPI tiles */}
      {KPI.map((kpi, i) => {
        const tileW = 110
        const tileX = 14 + i * (tileW + 10)
        return (
          <motion.g
            key={kpi.label}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
          >
            <rect
              x={tileX} y="14" width={tileW} height="46"
              rx="4" fill="rgba(111,77,146,0.1)" stroke="rgba(111,77,146,0.2)" strokeWidth="0.6"
            />
            <text
              x={tileX + 10} y="30"
              fill="rgba(255,255,255,0.28)" fontSize="6.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" letterSpacing="0.07em"
            >
              {kpi.label.toUpperCase()}
            </text>
            <text
              x={tileX + 10} y="49"
              fill={kpi.color} fontSize="16" fontFamily="'IBM Plex Mono', ui-monospace, monospace" fontWeight="600"
            >
              {kpi.value}
            </text>
          </motion.g>
        )
      })}

      {/* Chart baseline */}
      <line x1="24" y1="190" x2="376" y2="190" stroke="rgba(111,77,146,0.22)" strokeWidth="0.6" />

      {/* Y-axis tick lines */}
      {[166, 146, 126, 106].map((y, i) => (
        <line key={i} x1="24" y1={y} x2="376" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}

      {/* Area fill — animated via clipPath width trick */}
      <motion.path
        d={toArea(POINTS)}
        fill="url(#fv-area)"
        clipPath="url(#fv-chart-clip)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Line — animated pathLength draw-in */}
      <motion.path
        d={toPath(POINTS)}
        fill="none"
        stroke="#8b66b8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0.001 : 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Data point dots */}
      {POINTS.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r="3"
          fill="#0d0b14" stroke="#8b66b8" strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.25, delay: 0.4 + 0.18 * i }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}

      {/* Latest value callout */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
      >
        <rect x="334" y="78" width="54" height="22" rx="3" fill="rgba(111,77,146,0.25)" stroke="rgba(139,102,184,0.5)" strokeWidth="0.6" />
        <text x="361" y="91" fill="#b09fd0" fontSize="9" fontFamily="'IBM Plex Mono', ui-monospace, monospace" textAnchor="middle" fontWeight="600">
          +24.3%
        </text>
        {/* Connector to last point */}
        <line x1="366" y1="92" x2="361" y2="99" stroke="rgba(139,102,184,0.4)" strokeWidth="0.6" />
      </motion.g>

      {/* X-axis labels */}
      {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
        <text
          key={q}
          x={34 + i * 88} y="204"
          fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="'IBM Plex Mono', ui-monospace, monospace" textAnchor="middle"
        >
          {q}
        </text>
      ))}

      {/* Header */}
      <text
        x="360" y="16"
        fill="rgba(255,255,255,0.28)" fontSize="7.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" letterSpacing="0.09em"
        textAnchor="end"
      >
        PERFORMANCE METRICS
      </text>

      {/* Bottom bar */}
      <rect x="0" y="210" width="400" height="10" fill="rgba(10,8,18,0.85)" />
    </svg>
  )
}
