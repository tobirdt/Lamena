import { ArrowRight, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../data/content'
import { BrandLogo } from './BrandLogo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 72)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <Link className="brand-link" to="/" aria-label="Lamena home">
        <BrandLogo loading="eager" fetchPriority="high" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} to={`/${item.href}`}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" to="/#contact">
        Inquiry
        <ArrowRight aria-hidden="true" />
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open && (
        <motion.nav
          className="mobile-nav"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {navItems.map((item) => (
            <Link key={item.href} to={`/${item.href}`} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/#contact" className="mobile-nav-cta" onClick={() => setOpen(false)}>
            Send inquiry
            <ArrowRight aria-hidden="true" />
          </Link>
        </motion.nav>
      )}
    </header>
  )
}
