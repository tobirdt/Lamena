/**
 * Security & safety — defense in depth.
 * Two open Lamena "A" chevrons (Λ) stacked as successive barriers over a
 * solid purple core apex: layers to pass to reach the protected asset. Uses
 * the brand's apex geometry but a distinct composition from the hero monogram
 * (which nests concentrically). No callouts. Renders static.
 */

const CX = 200
const HALF = 72
const DEPTH = 27

const chevron = (baseY: number) =>
  `M ${CX - HALF} ${baseY} L ${CX} ${baseY - DEPTH} L ${CX + HALF} ${baseY}`

export function SecurityVisual() {
  return (
    <svg
      className="portfolio-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Outer barriers */}
      <path
        d={chevron(100)}
        fill="none"
        stroke="rgba(242, 240, 248,0.22)"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d={chevron(140)}
        fill="none"
        stroke="rgba(242, 240, 248,0.32)"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      {/* Innermost barrier + the protected core apex behind it */}
      <path
        d={chevron(180)}
        fill="none"
        stroke="rgba(242, 240, 248,0.4)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d={`M ${CX - 26} 180 L ${CX} ${180 - 38} L ${CX + 26} 180 Z`}
        fill="rgba(167, 139, 203,0.9)"
      />
    </svg>
  )
}
