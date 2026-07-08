/** Shared motion tokens — ease-out for entrances (UI under 300ms feels responsive).
 *  CSS counterparts: --ease-out / --duration-* / --dur-* in src/index.css — keep in sync. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const

export const REVEAL_VIEWPORT = { once: true, margin: '-72px' } as const

/** Section entrances — CSS: --dur-reveal */
export const DUR_REVEAL = 0.55
/** SVG stroke draw-ins — CSS: --dur-draw */
export const DUR_DRAW = 0.9
/** Large surface fades — CSS: --dur-slow */
export const DUR_SLOW = 0.8
