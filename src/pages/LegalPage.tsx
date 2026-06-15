import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Reveal } from '../components/Reveal'
import type { LegalSection } from '../types/content'

type LegalPageProps = {
  eyebrow: string
  title: string
  sections: LegalSection[]
}

export function LegalPage({ eyebrow, title, sections }: LegalPageProps) {
  const intro =
    title === 'Privacy Policy'
      ? 'This Privacy Policy explains how personal data is processed when visitors use this website or submit an inquiry.'
      : 'These Terms & Conditions explain the rules for accessing and using the Lamena website.'

  return (
    <div className="legal-shell">
      <Header />
      <main className="legal-main">
        <Reveal className="legal-panel">
          <span className="section-kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="legal-content">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.appendParagraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
          <Link className="secondary-button secondary-button--surface" to="/">
            Back to Lamena
          </Link>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
