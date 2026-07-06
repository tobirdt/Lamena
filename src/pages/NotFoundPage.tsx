import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Reveal } from '../components/Reveal'

export function NotFoundPage() {
  return (
    <div className="legal-shell">
      <Header />
      <main className="legal-main">
        <Reveal className="legal-panel not-found-panel">
          <span className="section-kicker">Error 404</span>
          <h1>This page does not exist.</h1>
          <p>
            The address may have changed or the page has been removed. Everything about
            Lamena — services, portfolio and contact — lives on the main page.
          </p>
          <Link className="secondary-button secondary-button--surface" to="/">
            <ArrowLeft aria-hidden="true" />
            Back to Lamena
          </Link>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
