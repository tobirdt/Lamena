import type { CSSProperties } from 'react'

/**
 * Security & safety — ONE circle: the perimeter.
 * Engineering-plan detail: defended zone with offset ring, radial dimension
 * leaders, a highlighted arc segment and a radius callout. No telemetry,
 * no loops — choreography is driven entirely by the CSS var --draw
 * (see "PORTFOLIO VISUALS" in App.css). Default --draw:1 = fully drawn.
 */

const CX = 200
const CY = 110
const R = 72
const R_INNER = 58

const point = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const
}

// 4 radial dimension leaders (ring → outside), with tick terminals
const LEADERS = [45, 135, 225, 315].map((deg) => {
  const [x1, y1] = point(deg, R + 4)
  const [x2, y2] = point(deg, R + 18)
  return { x1, y1, x2, y2 }
})

// Highlighted arc segment on the main circle
const [ax1, ay1] = point(-60, R)
const [ax2, ay2] = point(-10, R)

const i = (n: number) => ({ '--i': n }) as CSSProperties

export function SecurityVisual() {
  return (
    <svg
      className="portfolio-svg pf-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Registration marks — drawing-sheet corners */}
      <g className="pf-fade" style={i(0)} stroke="rgba(242, 240, 248,0.18)" strokeWidth="0.8">
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

      {/* Perimeter — main circle + offset inner ring */}
      <circle
        className="pf-draw"
        style={i(1)}
        cx={CX} cy={CY} r={R}
        pathLength={1}
        fill="none"
        stroke="rgba(242, 240, 248,0.30)"
        strokeWidth="1.1"
      />
      <circle
        className="pf-draw"
        style={i(1.6)}
        cx={CX} cy={CY} r={R_INNER}
        pathLength={1}
        fill="none"
        stroke="rgba(242, 240, 248,0.14)"
        strokeWidth="0.8"
        strokeDasharray="3 4"
      />

      {/* Radial dimension leaders with tick terminals */}
      <g className="pf-fade" style={i(2)} stroke="rgba(242, 240, 248,0.26)" strokeWidth="0.8">
        {LEADERS.map((l, idx) => (
          <line key={idx} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>

      {/* Radius line + center crosshair */}
      <line
        className="pf-draw"
        style={i(2.2)}
        x1={CX} y1={CY}
        x2={point(155, R)[0]} y2={point(155, R)[1]}
        pathLength={1}
        stroke="rgba(242, 240, 248,0.22)"
        strokeWidth="0.8"
      />
      <g className="pf-fade" style={i(2.6)} stroke="rgba(167, 139, 203,0.6)" strokeWidth="0.9">
        <line x1={CX - 9} y1={CY} x2={CX - 3} y2={CY} />
        <line x1={CX + 3} y1={CY} x2={CX + 9} y2={CY} />
        <line x1={CX} y1={CY - 9} x2={CX} y2={CY - 3} />
        <line x1={CX} y1={CY + 3} x2={CX} y2={CY + 9} />
      </g>

      {/* Highlighted arc segment — the detail under review */}
      <path
        className="pf-draw"
        style={i(2.4)}
        d={`M ${ax1} ${ay1} A ${R} ${R} 0 0 1 ${ax2} ${ay2}`}
        pathLength={1}
        fill="none"
        stroke="#a78bcb"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Leader from arc to callout */}
      <path
        className="pf-draw"
        style={i(2.8)}
        d={`M ${point(-40, R + 3)[0]} ${point(-40, R + 3)[1]} L 278 50 L 296 50`}
        pathLength={1}
        fill="none"
        stroke="rgba(167, 139, 203,0.5)"
        strokeWidth="0.8"
      />

      {/* Annotations — drawing callouts, not status text */}
      <g
        className="pf-fade"
        style={i(3)}
        fill="rgba(242, 240, 248,0.46)"
        fontFamily="'IBM Plex Mono', ui-monospace, monospace"
        fontSize="9.5"
        letterSpacing="0.14em"
      >
        <text x={296} y={44} textAnchor="end">PERIMETER</text>
        <text x={102} y={158}>R 72</text>
        <text x={100} y={192}>SEC / 01</text>
      </g>
    </svg>
  )
}
