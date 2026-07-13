import { consultingAreas, mediationAreas } from '../../data/content'
import type { ServiceArea } from '../../types/content'
import { Reveal } from '../Reveal'

function ServiceColumn({ title, items, delay = 0 }: { title: string; items: ServiceArea[]; delay?: number }) {
  return (
    <Reveal className="service-column" delay={delay}>
      <header className="service-column-head">
        <h3>{title}</h3>
        <span>{String(items.length).padStart(2, '0')} areas</span>
      </header>
      {/* list-style:none strips the list role in Safari — restore it */}
      <ol className="service-index" role="list">
        {items.map((item, index) => (
          <li key={item.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h4>{item.title}</h4>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

export function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <Reveal className="section-heading split">
        <div>
          <span className="section-kicker">Services</span>
          <h2>Lean advisory, technical mediation and project delivery.</h2>
        </div>
        <p>From early market analysis to turnkey delivery, across regulated and security-sensitive sectors.</p>
      </Reveal>

      <div className="service-columns">
        <ServiceColumn title="Mediation" items={mediationAreas} delay={0.06} />
        <ServiceColumn title="Consulting" items={consultingAreas} delay={0.12} />
      </div>
    </section>
  )
}
