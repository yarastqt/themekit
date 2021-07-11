import { TokenValue } from '../types'

/**
 * Checks value has alias.
 *
 * @param value - Token value.
 */
export function isAlias(value: TokenValue): boolean {
  return String(value).match(/{(.+)}/) !== null
}
