/** Shared motion tokens — one calm entrance system, ease-out only.
 *  CSS counterparts: --ease-out / --duration-* / --dur-reveal in src/index.css — keep in sync. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const

export const REVEAL_VIEWPORT = { once: true, margin: '-72px' } as const

/** Section entrances — CSS: --dur-reveal */
export const DUR_REVEAL = 0.45
