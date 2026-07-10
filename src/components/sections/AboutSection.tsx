import { expertiseItems } from '../../data/content'
import { Reveal } from '../Reveal'

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <Reveal className="section-heading">
        <span className="section-kicker">About</span>
        <h2>Your bridge to trust and security.</h2>
      </Reveal>

      <div className="about-layout">
        <Reveal className="about-lead" delay={0.06}>
          <p className="about-statement">
            More than 20 years of experience in communication and security &amp; safety
            engineering — for government, defense, industry and the private sector.
          </p>
          <p>
            Through strategic partnerships with leading manufacturers, Lamena delivers
            technological solutions for demanding and sensitive environments — from first
            consultation to turnkey delivery and after-sales support.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          {/* list-style:none strips the list role in Safari — restore it */}
          <ol className="expertise-list" role="list">
            {expertiseItems.map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
