import type { CSSProperties } from 'react'

/**
 * Finance & transformation — THREE circles: the converged system.
 * Structural summary: a compact venn (sibling of the hero mark, different
 * proportions), centroid crosshair, hatched triple intersection and indexed
 * dimension leaders 01/02/03. Completes the 1 → 2 → 3 build across the
 * portfolio row. Choreography via CSS var --draw (App.css).
 */

const R = 54
const C1 = { x: 172, y: 88 }   // 01 — top left
const C2 = { x: 228, y: 88 }   // 02 — top right
const C3 = { x: 200, y: 136 }  // 03 — bottom
const CENTROID = { x: 200, y: 104 }

// Hatching for the triple intersection (clipped by all three circles)
const HATCH = Array.from({ length: 7 }, (_, n) => {
  const x = 182 + n * 6
  return { x1: x - 24, y1: 150, x2: x + 24, y2: 62 }
})

const i = (n: number) => ({ '--i': n }) as CSSProperties

export function FinanceVisual() {
  return (
    <svg
      className="portfolio-svg pf-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="fv-c1"><circle cx={C1.x} cy={C1.y} r={R} /></clipPath>
        <clipPath id="fv-c2"><circle cx={C2.x} cy={C2.y} r={R} /></clipPath>
        <clipPath id="fv-c3"><circle cx={C3.x} cy={C3.y} r={R} /></clipPath>
      </defs>

      {/* Registration marks */}
      <g className="pf-fade" style={i(0)} stroke="rgba(240,238,255,0.18)" strokeWidth="0.8">
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

      {/* The three system circles */}
      {[C1, C2, C3].map((c, idx) => (
        <circle
          key={idx}
          className="pf-draw"
          style={i(1 + idx * 0.4)}
          cx={c.x} cy={c.y} r={R}
          pathLength={1}
          fill="none"
          stroke="rgba(240,238,255,0.30)"
          strokeWidth="1.1"
        />
      ))}

      {/* Triple intersection — hatched (clip 1 ∩ clip 2 ∩ clip 3) */}
      <g clipPath="url(#fv-c1)">
        <g clipPath="url(#fv-c2)">
          <g className="pf-fade" style={i(2.4)} clipPath="url(#fv-c3)">
            <rect x={160} y={60} width={80} height={92} fill="rgba(139,102,184,0.1)" />
            <g stroke="rgba(167,139,203,0.45)" strokeWidth="0.7">
              {HATCH.map((h, idx) => (
                <line key={idx} x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} />
              ))}
            </g>
          </g>
        </g>
      </g>

      {/* Centroid crosshair */}
      <g className="pf-fade" style={i(2.6)} stroke="rgba(167,139,203,0.6)" strokeWidth="0.9">
        <line x1={CENTROID.x - 9} y1={CENTROID.y} x2={CENTROID.x - 3} y2={CENTROID.y} />
        <line x1={CENTROID.x + 3} y1={CENTROID.y} x2={CENTROID.x + 9} y2={CENTROID.y} />
        <line x1={CENTROID.x} y1={CENTROID.y - 9} x2={CENTROID.x} y2={CENTROID.y - 3} />
        <line x1={CENTROID.x} y1={CENTROID.y + 3} x2={CENTROID.x} y2={CENTROID.y + 9} />
      </g>

      {/* Labeled circle centers — survey-point convention (stays inside
          the slice-crop safe zone on narrow cards) */}
      <g className="pf-fade" style={i(2.2)} fill="rgba(240,238,255,0.4)">
        <circle cx={C1.x} cy={C1.y} r="1.6" />
        <circle cx={C2.x} cy={C2.y} r="1.6" />
        <circle cx={C3.x} cy={C3.y} r="1.6" />
      </g>

      {/* Annotations */}
      <g
        className="pf-fade"
        style={i(3)}
        fill="rgba(240,238,255,0.46)"
        fontFamily="'IBM Plex Mono', ui-monospace, monospace"
        fontSize="9.5"
        letterSpacing="0.14em"
      >
        <text x={C1.x - 26} y={C1.y - 6}>01</text>
        <text x={C2.x + 10} y={C2.y - 6}>02</text>
        <text x={C3.x + 8} y={C3.y + 14}>03</text>
        <text x={100} y={192}>FIN / 03</text>
      </g>
    </svg>
  )
}
