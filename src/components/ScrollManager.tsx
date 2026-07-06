import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'
    const targetId = location.hash.replace('#', '')
    if (!targetId) {
      window.scrollTo({ top: 0, behavior })
      return
    }

    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior, block: 'start' })
    }, 40)
  }, [location.pathname, location.hash])

  return null
}
