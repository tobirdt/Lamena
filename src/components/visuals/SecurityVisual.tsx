/**
 * Security & safety — layered protection.
 * The Lamena "A" apex (Λ) nested in concentric layers around a solid core:
 * a defended asset inside successive perimeters. Built entirely from the
 * brand's own apex geometry — no telemetry, no callouts. Renders static.
 */

const CX = 200
const BASE = 178

// Nested apexes share a baseline and a constant slant (the logo's angle).
// Outermost first → innermost; the innermost is the protected core.
const LAYERS = [
  { h: 132, w: 84 },
  { h: 100, w: 63 },
  { h: 68, w: 42 },
]

const apex = (h: number, w: number) =>
  `M ${CX - w} ${BASE} L ${CX} ${BASE - h} L ${CX + w} ${BASE}`

export function SecurityVisual() {
  return (
    <svg
      className="portfolio-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Baseline */}
      <line
        x1="56" y1={BASE} x2="344" y2={BASE}
        stroke="rgba(242, 240, 248,0.14)" strokeWidth="1"
      />

      {/* Perimeter layers — light apex outlines, fainter outward */}
      {LAYERS.map((l, idx) => (
        <path
          key={idx}
          d={apex(l.h, l.w)}
          fill="none"
          stroke="rgba(242, 240, 248,0.26)"
          strokeWidth="1.1"
          strokeLinejoin="round"
          opacity={0.4 + idx * 0.22}
        />
      ))}

      {/* Protected core — the brand apex, solid purple */}
      <path
        d={`${apex(36, 22)} Z`}
        fill="rgba(167, 139, 203,0.92)"
        stroke="none"
      />
    </svg>
  )
}
