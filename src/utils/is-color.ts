/**
 * Checks value for color-like.
 *
 * @param value - Any value.
 * @returns Value is color.
 */
export function isColor(value: string | number): boolean {
  return /^(#|rgba?|hsla?|color|transparent)/.test(String(value))
}
