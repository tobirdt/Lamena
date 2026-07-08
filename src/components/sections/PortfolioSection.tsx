import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { portfolioCards } from '../../data/content'
import type { PortfolioCard } from '../../types/content'
import { Reveal } from '../Reveal'
import { CommunicationVisual } from '../visuals/CommunicationVisual'
import { FinanceVisual } from '../visuals/FinanceVisual'
import { SecurityVisual } from '../visuals/SecurityVisual'

const VISUALS: Record<PortfolioCard['type'], ComponentType> = {
  security: SecurityVisual,
  communication: CommunicationVisual,
  finance: FinanceVisual,
}

function PortfolioCardItem({ card, index }: { card: PortfolioCard; index: number }) {
  const Visual = VISUALS[card.type]
  const visualRef = useRef<HTMLDivElement>(null)
  const inView = useInView(visualRef, { once: true, margin: '-72px' })
  const reduced = useReducedMotion()

  // Arm the draw choreography only after mount and only when motion is OK —
  // server markup / no-JS / reduced-motion keep the finished drawing.
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!reduced) setArmed(true)
  }, [reduced])

  return (
    <Reveal className="portfolio-card" delay={index * 0.08}>
      <div
        ref={visualRef}
        className={`portfolio-visual${armed ? ' pf-armed' : ''}${inView ? ' pf-inview' : ''}`}
      >
        <Visual />
      </div>
      <div className="portfolio-body">
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
    </Reveal>
  )
}

export function PortfolioSection() {
  return (
    <section className="section portfolio-section" id="portfolio">
      <Reveal className="section-heading centered">
        <span className="section-kicker">Portfolio</span>
        <h2>Focused expertise for organizations where reliability matters.</h2>
        <p>
          From start-up entities to national and international market leaders, Lamena serves as a
          trusted consultant and project partner across the security &amp; safety, defense,
          communications and finance sectors.
        </p>
      </Reveal>

      <div className="portfolio-grid">
        {portfolioCards.map((card, index) => (
          <PortfolioCardItem key={card.title} card={card} index={index} />
        ))}
      </div>
    </section>
  )
}
