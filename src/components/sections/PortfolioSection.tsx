import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { portfolioCards } from '../../data/content'
import type { PortfolioCard } from '../../types/content'
import { useEntrance } from '../../lib/useEntrance'
import { CommunicationVisual } from '../visuals/CommunicationVisual'
import { FinanceVisual } from '../visuals/FinanceVisual'
import { SecurityVisual } from '../visuals/SecurityVisual'

const VISUALS: Record<PortfolioCard['type'], ComponentType> = {
  security: SecurityVisual,
  communication: CommunicationVisual,
  finance: FinanceVisual,
}

function PortfolioCase({
  card,
  index,
  pinned,
}: {
  card: PortfolioCard
  index: number
  pinned: boolean
}) {
  const Visual = VISUALS[card.type]
  const ref = useRef<HTMLElement>(null)
  const entrance = useEntrance(!pinned, ref)

  return (
    <article ref={ref} className={`pf-case${pinned ? '' : entrance}`}>
      <span className="pf-case-index" aria-hidden="true">
        0{index + 1}
      </span>
      <div className="portfolio-visual">
        <Visual />
      </div>
      <div className="pf-case-body">
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
    </article>
  )
}

export function PortfolioSection() {
  const outerRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Pin activates client-side only, on viewports ≥769px with motion allowed.
  // First paint (and no-JS) is always the flowing layout.
  const [canPin, setCanPin] = useState(false)
  useEffect(() => {
    if (reduced) {
      setCanPin(false)
      return
    }
    const mq = window.matchMedia('(min-width: 769px)')
    const update = () => setCanPin(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduced])

  // Pin length from MEASURED content: one viewport for the stage plus a
  // measured reveal distance per case — never a bare viewport multiple.
  const [pinHeight, setPinHeight] = useState<number | null>(null)
  useEffect(() => {
    if (!canPin) {
      setPinHeight(null)
      return
    }
    let raf = 0
    const measure = () => {
      const caseEl = stageRef.current?.querySelector('.pf-case')
      if (!caseEl) return
      const vh = window.innerHeight
      const reveal = Math.max(caseEl.getBoundingClientRect().height, vh * 0.55)
      setPinHeight(Math.round(vh + portfolioCards.length * reveal + vh * 0.3))
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    measure()
    const ro = new ResizeObserver(schedule)
    if (stageRef.current) ro.observe(stageRef.current)
    window.addEventListener('resize', schedule)
    // Font swap shifts metrics after first measure
    document.fonts?.ready.then(schedule).catch(() => {})
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [canPin])

  const pinned = canPin && pinHeight !== null

  // Scroll progress 0→1 across the tall outer section, streamed into --pf.
  // Direct write, no smoothing — choreography must track the thumb exactly.
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    stageRef.current?.style.setProperty('--pf', v.toFixed(4))
  })

  const headingEntrance = useEntrance(!pinned, headingRef)

  return (
    <section
      id="portfolio"
      ref={outerRef}
      className="section portfolio-section"
      data-pinned={pinned || undefined}
      style={pinned ? { height: pinHeight } : undefined}
    >
      <div className="portfolio-pin">
        <div ref={stageRef} className="portfolio-stage">
          <div
            ref={headingRef}
            className={`section-heading pf-heading${pinned ? '' : headingEntrance}`}
          >
            <span className="section-kicker">Portfolio</span>
            <h2>Focused expertise for organizations where reliability matters.</h2>
            <p>
              From start-up entities to national and international market leaders, Lamena serves as
              a trusted consultant and project partner across the security &amp; safety, defense,
              communications and finance sectors.
            </p>
          </div>

          <div className="portfolio-grid">
            {portfolioCards.map((card, index) => (
              <PortfolioCase key={card.title} card={card} index={index} pinned={pinned} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
