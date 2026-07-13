/**
 * Communication industries — connected reach.
 * A span of Lamena "A" apexes (Λ) whose tips are linked into one continuous
 * ridge: distinct industries joined into a single network. Built from the
 * brand's apex geometry — no callouts, no fake telemetry. Renders static.
 */

const BASE = 176

// Apex peaks across the span; symmetric so the ridge reads as reach, not a
// chart. [x, height]; a constant half-width keeps the logo's slant.
const HALF = 30
const PEAKS: Array<[number, number]> = [
  [64, 46],
  [132, 84],
  [200, 120],
  [268, 84],
  [336, 46],
]

const tip = ([x, h]: [number, number]) => [x, BASE - h] as const
const apex = ([x, h]: [number, number]) =>
  `M ${x - HALF} ${BASE} L ${x} ${BASE - h} L ${x + HALF} ${BASE}`

export function CommunicationVisual() {
  const ridge = PEAKS.map(tip)
    .map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ')

  return (
    <svg
      className="portfolio-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Baseline */}
      <line
        x1="34" y1={BASE} x2="366" y2={BASE}
        stroke="rgba(242, 240, 248,0.14)" strokeWidth="1"
      />

      {/* Connecting ridge — the network linking every peak */}
      <path
        d={ridge}
        fill="none"
        stroke="rgba(167, 139, 203,0.45)"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Apex peaks */}
      {PEAKS.map((p, idx) => (
        <path
          key={idx}
          d={apex(p)}
          fill="none"
          stroke="rgba(242, 240, 248,0.28)"
          strokeWidth="1.1"
          strokeLinejoin="round"
          opacity={idx === 2 ? 1 : 0.7}
        />
      ))}

      {/* Nodes at each tip — the central hub in brand purple */}
      {PEAKS.map((p, idx) => {
        const [x, y] = tip(p)
        return (
          <circle
            key={idx}
            cx={x} cy={y} r={idx === 2 ? 3 : 2.2}
            fill={idx === 2 ? 'rgba(167, 139, 203,0.95)' : 'rgba(242, 240, 248,0.4)'}
          />
        )
      })}
    </svg>
  )
}
