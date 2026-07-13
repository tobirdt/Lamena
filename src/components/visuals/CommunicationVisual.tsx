import type { CSSProperties } from 'react'

/**
 * Communication — TWO circles: the link.
 * Coverage diagram: two overlapping zones (vesica piscis), the shared lens
 * hatched in section-cut convention, a center-to-center line with tick marks
 * and a distance callout. Choreography via CSS var --draw (App.css).
 */

const AX = 152
const BX = 248
const CY = 110
const R = 64

// Diagonal hatching lines spanning the lens area, clipped to the intersection
const HATCH = Array.from({ length: 9 }, (_, n) => {
  const x = 168 + n * 8
  return { x1: x - 30, y1: CY + 62, x2: x + 30, y2: CY - 62 }
})

const i = (n: number) => ({ '--i': n }) as CSSProperties

export function CommunicationVisual() {
  return (
    <svg
      className="portfolio-svg pf-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Lens = intersection of both coverage zones (clip A ∩ clip B) */}
        <clipPath id="cv-lens">
          <circle cx={AX} cy={CY} r={R} />
        </clipPath>
        <clipPath id="cv-lens-b">
          <circle cx={BX} cy={CY} r={R} />
        </clipPath>
      </defs>

      {/* Registration marks */}
      <g className="pf-fade" style={i(0)} stroke="rgba(243, 239, 230,0.18)" strokeWidth="0.8">
        {[
          [52, 36],
          [348, 36],
          [52, 184],
          [348, 184],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
          </g>
        ))}
      </g>

      {/* Coverage zones */}
      <circle
        className="pf-draw"
        style={i(1)}
        cx={AX} cy={CY} r={R}
        pathLength={1}
        fill="none"
        stroke="rgba(243, 239, 230,0.30)"
        strokeWidth="1.1"
      />
      <circle
        className="pf-draw"
        style={i(1.4)}
        cx={BX} cy={CY} r={R}
        pathLength={1}
        fill="none"
        stroke="rgba(243, 239, 230,0.30)"
        strokeWidth="1.1"
      />

      {/* Shared lens — section-cut hatching, clipped to zone A ∩ zone B */}
      <g clipPath="url(#cv-lens)">
        <g className="pf-fade" style={i(2.4)} clipPath="url(#cv-lens-b)">
          <circle cx={BX} cy={CY} r={R} fill="rgba(138, 109, 59,0.08)" />
          <g stroke="rgba(194, 168, 120,0.4)" strokeWidth="0.7">
            {HATCH.map((h, idx) => (
              <line key={idx} x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} />
            ))}
          </g>
        </g>
      </g>

      {/* Center-to-center line with tick marks */}
      <line
        className="pf-draw"
        style={i(2)}
        x1={AX} y1={CY} x2={BX} y2={CY}
        pathLength={1}
        stroke="rgba(243, 239, 230,0.26)"
        strokeWidth="0.8"
      />
      <g className="pf-fade" style={i(2.2)} stroke="rgba(243, 239, 230,0.3)" strokeWidth="0.8">
        <line x1={AX} y1={CY - 6} x2={AX} y2={CY + 6} />
        <line x1={BX} y1={CY - 6} x2={BX} y2={CY + 6} />
      </g>

      {/* Node marks at centers */}
      <g className="pf-fade" style={i(2.6)}>
        <circle cx={AX} cy={CY} r="2.6" fill="#c2a878" />
        <circle cx={BX} cy={CY} r="2.6" fill="#c2a878" />
      </g>

      {/* Distance leader below */}
      <g className="pf-fade" style={i(2.8)} stroke="rgba(243, 239, 230,0.22)" strokeWidth="0.7">
        <line x1={AX} y1={CY + R + 8} x2={BX} y2={CY + R + 8} />
        <line x1={AX} y1={CY + R + 4} x2={AX} y2={CY + R + 12} />
        <line x1={BX} y1={CY + R + 4} x2={BX} y2={CY + R + 12} />
      </g>

      {/* Annotations */}
      <g
        className="pf-fade"
        style={i(3)}
        fill="rgba(243, 239, 230,0.46)"
        fontFamily="'IBM Plex Mono', ui-monospace, monospace"
        fontSize="9.5"
        letterSpacing="0.14em"
      >
        <text x={AX - 34} y={CY - R - 10}>ZONE A</text>
        <text x={BX - 4} y={CY - R - 10}>ZONE B</text>
        <text x={186} y={CY + R + 22}>D 96</text>
        <text x={100} y={192}>COM / 02</text>
      </g>
    </svg>
  )
}
