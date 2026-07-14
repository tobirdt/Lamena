import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { OperatingModelSection } from '../components/sections/OperatingModelSection'
import { PortfolioSection } from '../components/sections/PortfolioSection'
import { ServicesSection } from '../components/sections/ServicesSection'

export function HomePage() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <OperatingModelSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
