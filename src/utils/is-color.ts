import type { TokenValue } from '../types'

/**
 * Checks value for color-like.
 *
 * @param value - Any value.
 * @returns Value is color.
 */
export function isColor(value: TokenValue): boolean {
  return /^(#|rgba?|hsla?|color|transparent)/.test(String(value))
}
