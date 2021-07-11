import type { Filter } from '../types'
import { isColor } from '../utils/is-color'

/**
 * Filter which checks value is color-like.
 */
export const isValueColorFilter: Filter = {
  name: 'value/is-color',
  matcher: ({ token }) => isColor(token.value),
}
