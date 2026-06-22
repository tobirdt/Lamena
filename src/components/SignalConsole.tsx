import { BadgeCheck, LockKeyhole } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const nodes = [
  { x: '12%', y: '28%', label: 'A' },
  { x: '34%', y: '16%', label: 'B' },
  { x: '58%', y: '36%', label: 'C' },
  { x: '77%', y: '20%', label: 'D' },
  { x: '26%', y: '66%', label: 'E' },
  { x: '52%', y: '76%', label: 'F' },
  { x: '84%', y: '64%', label: 'G' },
]

export function SignalConsole() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="signal-console" aria-label="Animated system map">
      <div className="console-header">
        <div>
          <span>Operational map</span>
          <strong>Live coordination layer</strong>
        </div>
        <BadgeCheck aria-hidden="true" />
      </div>

      <div className="console-map">
        <div className="console-grid" aria-hidden="true" />
        <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M12 28 C25 12 44 18 58 36 S74 30 77 20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          />
          <motion.path
            d="M26 66 C39 48 48 62 52 76 S74 78 84 64"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
          />
          <motion.path
            d="M34 16 C38 38 44 58 52 76"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          />
        </svg>

        {!prefersReducedMotion && (
          <motion.div
            className="scan-line"
            animate={{ x: ['-20%', '120%'] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {nodes.map((node, index) => (
          <motion.div
            className="map-node"
            key={node.label}
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
          >
            {node.label}
          </motion.div>
        ))}

        <motion.div
          className="pulse-core"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: prefersReducedMotion ? 1 : [1, 1.04, 1] }}
          transition={{ duration: 2.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        >
          <LockKeyhole aria-hidden="true" />
        </motion.div>
      </div>

      <div className="console-footer">
        <span>Security layer</span>
        <span>Safety protocol</span>
        <span>Communication path</span>
      </div>
    </div>
  )
}
