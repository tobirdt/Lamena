import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Pinned sections land at the REVEALED state, not the empty pin start. */
const PIN_LANDING = 0.9

/** Settle window for deep links: font swap, pin-height commit and late
 *  images shift layout AFTER the first scroll — re-apply until stable. */
const SETTLE_STEPS_MS = [0, 150, 350, 600, 850]

function applyHashScroll(targetId: string, behavior: ScrollBehavior) {
  const el = document.getElementById(targetId)
  if (!el) return
  if (el.hasAttribute('data-pinned')) {
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: top + (el.offsetHeight - window.innerHeight) * PIN_LANDING,
      behavior,
    })
  } else {
    el.scrollIntoView({ behavior, block: 'start' })
  }
}

export function ScrollManager() {
  const location = useLocation()
  const firstRun = useRef(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'
    const targetId = location.hash.replace('#', '')
    const isFirst = firstRun.current
    firstRun.current = false

    if (!targetId) {
      // First load without hash: leave scroll restoration to the browser
      if (!isFirst) window.scrollTo({ top: 0, behavior })
      return
    }

    if (isFirst) {
      // Deep link: re-apply instantly across the settle window; any real user
      // scroll intent cancels immediately. MUST be 'instant', not 'auto' —
      // html { scroll-behavior: smooth } would animate 'auto' and the
      // overlapping smooth scrolls fight each other.
      let cancelled = false
      const cancel = () => {
        cancelled = true
      }
      const opts = { once: true, passive: true } as const
      window.addEventListener('wheel', cancel, opts)
      window.addEventListener('touchstart', cancel, opts)
      window.addEventListener('keydown', cancel, opts)
      const timers = SETTLE_STEPS_MS.map((ms) =>
        window.setTimeout(() => {
          if (!cancelled) applyHashScroll(targetId, 'instant' as ScrollBehavior)
        }, ms),
      )
      return () => {
        timers.forEach((t) => window.clearTimeout(t))
        window.removeEventListener('wheel', cancel)
        window.removeEventListener('touchstart', cancel)
        window.removeEventListener('keydown', cancel)
      }
    }

    // In-page navigation: layout is already stable — one scroll is enough.
    // 40ms lets a freshly mounted route paint its target first.
    const timer = window.setTimeout(() => applyHashScroll(targetId, behavior), 40)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return null
}
