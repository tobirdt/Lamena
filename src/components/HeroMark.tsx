// The Lamena mark — the logo's open "A" apex (Λ) nested in concentric layers
// into a quiet monogram, brand-purple at the core. Built from the wordmark's
// own geometry (not a generic diagram): a mark, not an instrument. Static.

const CX = 210
const BASE = 300

// Outer → inner. Constant slant echoes the logo's angle; the core is purple.
const LAYERS = [
  { h: 260, w: 150, stroke: 'rgba(242, 240, 248,0.09)', width: 1 },
  { h: 216, w: 118, stroke: 'rgba(242, 240, 248,0.15)', width: 1 },
  { h: 172, w: 86, stroke: 'rgba(242, 240, 248,0.24)', width: 1.1 },
  { h: 128, w: 54, stroke: 'rgba(167, 139, 203,0.9)', width: 2.2 },
]

const apex = (h: number, w: number) =>
  `M ${CX - w} ${BASE} L ${CX} ${BASE - h} L ${CX + w} ${BASE}`

export function HeroMark() {
  const coreTipY = BASE - LAYERS[LAYERS.length - 1].h

  return (
    <svg viewBox="0 0 420 398" className="hero-mark" aria-hidden="true">
      {/* Baseline */}
      <line
        x1="60" y1={BASE} x2="360" y2={BASE}
        stroke="rgba(242, 240, 248,0.1)" strokeWidth="1"
      />

      {/* Nested apex layers */}
      {LAYERS.map((l, idx) => (
        <path
          key={idx}
          d={apex(l.h, l.w)}
          fill="none"
          stroke={l.stroke}
          strokeWidth={l.width}
          strokeLinejoin="round"
        />
      ))}

      {/* Apex vertex — a single quiet purple mark */}
      <circle cx={CX} cy={coreTipY} r="3" fill="rgba(167, 139, 203,0.95)" />
    </svg>
  )
}
