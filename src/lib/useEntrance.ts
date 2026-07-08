import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * CSS-class entrance arming, shared by sections that choreograph inner
 * details (hairlines, SVG strokes) in plain CSS.
 *
 * Returns ` pf-armed pf-inview` class fragments: elements are only moved to
 * their hidden start state AFTER mount and only when motion is allowed
 * (.pf-armed), then revealed on viewport entry (.pf-inview) via CSS
 * transitions. Reduced-motion and no-JS render the finished state.
 */
export function useEntrance(active: boolean, ref: RefObject<Element | null>, margin = '-72px') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once: true, margin: margin as any })
  const reduced = useReducedMotion()
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (active && !reduced) setArmed(true)
  }, [active, reduced])

  return `${armed ? ' pf-armed' : ''}${inView ? ' pf-inview' : ''}`
}
