import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../data/content'
import { EASE_OUT } from '../lib/motion'
import { BrandLogo } from './BrandLogo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  // Only the home page has a dark hero behind the header
  const onDarkHero = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 72)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scrollspy — highlight the section currently in the reading band
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    // Track ALL currently intersecting sections (the callback only reports changes)
    const intersecting = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id)
          else intersecting.delete(entry.target.id)
        }
        const topmost = navItems.find((item) => intersecting.has(item.href.slice(1)))
        if (topmost) {
          setActiveSection(topmost.href.slice(1))
        } else if (window.scrollY < window.innerHeight * 0.7) {
          // Still inside the hero — nothing should read as active
          setActiveSection('')
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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
    <header ref={headerRef} className={`site-header${scrolled || !onDarkHero ? ' is-scrolled' : ''}`}>
      <Link className="brand-link" to="/" aria-label="Lamena home">
        <BrandLogo loading="eager" fetchPriority="high" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.slice(1)
          return (
            <Link
              key={item.href}
              to={`/${item.href}`}
              className={isActive ? 'is-active' : undefined}
              aria-current={isActive ? 'location' : undefined}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Link className="header-cta" to="/#contact">
        Send inquiry
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
