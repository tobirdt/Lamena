/**
 * Finance & transformation — ascending trajectory.
 * A sequence of Lamena "A" apexes (Λ) rising left → right, their tips traced
 * by a growth line into the brand-purple peak: measured progression toward a
 * transformed state. Built from the brand's apex geometry. Renders static.
 */

const BASE = 178

const HALF = 26
const PEAKS: Array<[number, number]> = [
  [76, 42],
  [146, 66],
  [216, 92],
  [286, 122],
]

const tip = ([x, h]: [number, number]) => [x, BASE - h] as const
const apex = ([x, h]: [number, number]) =>
  `M ${x - HALF} ${BASE} L ${x} ${BASE - h} L ${x + HALF} ${BASE}`

export function FinanceVisual() {
  const last = PEAKS.length - 1
  const trajectory = PEAKS.map(tip)
    .map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ')

  return (
    <svg
      className="portfolio-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Growth trajectory through the apex tips */}
      <path
        d={trajectory}
        fill="none"
        stroke="rgba(167, 139, 203,0.4)"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeLinejoin="round"
      />

      {/* Ascending apexes — the final peak in brand purple */}
      {PEAKS.map((p, idx) => (
        <path
          key={idx}
          d={apex(p)}
          fill="none"
          stroke={idx === last ? 'rgba(167, 139, 203,0.92)' : 'rgba(242, 240, 248,0.28)'}
          strokeWidth={idx === last ? 1.6 : 1.1}
          strokeLinejoin="round"
          opacity={idx === last ? 1 : 0.55 + idx * 0.12}
        />
      ))}

      {/* Tip nodes */}
      {PEAKS.map((p, idx) => {
        const [x, y] = tip(p)
        return (
          <circle
            key={idx}
            cx={x} cy={y} r={idx === last ? 3 : 2}
            fill={idx === last ? 'rgba(167, 139, 203,0.95)' : 'rgba(242, 240, 248,0.38)'}
          />
        )
      })}
    </svg>
  )
}
