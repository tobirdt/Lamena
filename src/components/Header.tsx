import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../data/content'
import { EASE_OUT } from '../lib/motion'
import { BrandLogo } from './BrandLogo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 72)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    const onResize = () => {
      if (window.innerWidth > 680) setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
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

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
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
      </AnimatePresence>
    </header>
  )
}
