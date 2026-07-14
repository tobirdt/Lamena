import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Settle window for deep links: the display-font swap can shift layout
 *  after the first scroll — re-apply once until stable. */
const SETTLE_STEPS_MS = [0, 350]

function applyHashScroll(targetId: string, behavior: ScrollBehavior) {
  const el = document.getElementById(targetId)
  if (!el) return
  el.scrollIntoView({ behavior, block: 'start' })
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
      // scroll intent cancels immediately.
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
          if (!cancelled) applyHashScroll(targetId, 'auto')
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
