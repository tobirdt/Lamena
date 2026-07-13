import { operatingSteps } from '../../data/content'
import { Reveal } from '../Reveal'

export function OperatingModelSection() {
  return (
    <section className="operating-section" aria-label="Lamena operating model">
      <Reveal className="section-heading">
        <span className="section-kicker">Operating model</span>
        <h2>Simple structure for complex environments.</h2>
        <p>Understand the environment, connect the right partners, deliver with discipline.</p>
      </Reveal>

      <Reveal className="operating-steps" delay={0.08}>
        {operatingSteps.map((step, index) => (
          <div className="operating-card" key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
