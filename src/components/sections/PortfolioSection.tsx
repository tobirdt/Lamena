import type { ComponentType } from 'react'
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

  return (
    <Reveal className="portfolio-card" delay={index * 0.08}>
      <div className="portfolio-visual">
        <Visual />
        <div className="portfolio-visual-tag">
          <card.icon aria-hidden="true" />
          <span>{card.label}</span>
        </div>
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
