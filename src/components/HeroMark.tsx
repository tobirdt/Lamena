// Three overlapping circles — the brand's Security ∩ Safety ∩ Communication
// monogram. Quiet and static: a mark, not an instrument. (Earlier versions
// had a radar-style tick ring + crosshair; removed for institutional calm.)
const CIRCLES = [
  { cx: 148, cy: 158 },
  { cx: 272, cy: 158 },
  { cx: 210, cy: 244 },
]

const LABELS = [
  { text: 'Security',      x: 148, y: 52 },
  { text: 'Safety',        x: 272, y: 52 },
  { text: 'Communication', x: 210, y: 372 },
]

const R = 112
const CX = 210
const CY = 187

export function HeroMark() {
  return (
    <svg viewBox="0 0 420 398" className="hero-mark" aria-hidden="true">
      <defs>
        <radialGradient id="hm-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b9a0da" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6f4d92" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Venn circles */}
      {CIRCLES.map((c, i) => (
        <circle
          key={i}
          cx={c.cx} cy={c.cy} r={R}
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(242, 240, 248,0.24)"
          strokeWidth="1"
        />
      ))}

      {/* Soft warmth + a single quiet mark at the triple intersection */}
      <ellipse cx={CX} cy={CY} rx="46" ry="40" fill="url(#hm-core)" />
      <circle cx={CX} cy={CY} r="2.5" fill="#b9a0da" opacity="0.75" />

      {/* Labels */}
      {LABELS.map((l) => (
        <text
          key={l.text}
          x={l.x} y={l.y}
          textAnchor="middle"
          fill="rgba(242, 240, 248,0.46)"
          fontSize="10.5"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="600"
          letterSpacing="0.2em"
        >
          {l.text.toUpperCase()}
        </text>
      ))}
    </svg>
  )
}
