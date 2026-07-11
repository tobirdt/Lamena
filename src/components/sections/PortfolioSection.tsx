import type { ComponentType } from 'react'
import { portfolioCards } from '../../data/content'
import type { PortfolioCard } from '../../types/content'
import { MaskReveal } from '../MaskReveal'
import { Reveal } from '../Reveal'
import { CommunicationVisual } from '../visuals/CommunicationVisual'
import { FinanceVisual } from '../visuals/FinanceVisual'
import { SecurityVisual } from '../visuals/SecurityVisual'

const VISUALS: Record<PortfolioCard['type'], ComponentType> = {
  security: SecurityVisual,
  communication: CommunicationVisual,
  finance: FinanceVisual,
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="portfolio-stage">
        <Reveal className="section-heading">
          <span className="section-kicker">Portfolio</span>
          <h2>
            <MaskReveal>Focused expertise for organizations where reliability matters.</MaskReveal>
          </h2>
          <p>A trusted consultant and project partner across security, defense, communications and finance.</p>
        </Reveal>

        <Reveal className="portfolio-grid" delay={0.08}>
          {portfolioCards.map((card, index) => {
            const Visual = VISUALS[card.type]
            return (
              <article key={card.title} className="pf-case">
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
          })}
        </Reveal>
      </div>
    </section>
  )
}
