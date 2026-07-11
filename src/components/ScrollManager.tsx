import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../lib/smoothScroll'

/** Settle window for deep links: the display-font swap can shift layout
 *  after the first scroll — re-apply once until stable. */
const SETTLE_STEPS_MS = [0, 350]

/** Routes every programmatic scroll through Lenis when it's running, so its
 *  internal position stays in sync — falls back to native APIs otherwise
 *  (reduced motion, or before Lenis has mounted). */
function scrollToTop(behavior: ScrollBehavior) {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(0, { immediate: behavior === 'auto' })
  } else {
    window.scrollTo({ top: 0, behavior })
  }
}

function applyHashScroll(targetId: string, behavior: ScrollBehavior) {
  const el = document.getElementById(targetId)
  if (!el) return
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { immediate: behavior === 'instant' })
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
      if (!isFirst) scrollToTop(behavior)
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
