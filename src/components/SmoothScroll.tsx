import { useEffect } from 'react'
import { initSmoothScroll } from '../lib/smoothScroll'

/** Mount once at the app root — owns the Lenis lifecycle. */
export function SmoothScroll() {
  useEffect(() => initSmoothScroll(), [])
  return null
}
