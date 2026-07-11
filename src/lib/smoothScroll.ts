import Lenis from 'lenis'

let lenis: Lenis | null = null

/** The active Lenis instance, or null when not running (reduced motion / not yet mounted). */
export function getLenis(): Lenis | null {
  return lenis
}

/** Starts Lenis's inertia scroll + rAF loop. Returns a cleanup function. */
export function initSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  })

  let rafId = 0
  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  }
}
