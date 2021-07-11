import type { Filter } from '../types'
import { isColor } from '../utils/is-color'

/**
 * Filter which checks value is non color-like.
 */
export const isValueNotColorFilter: Filter = {
  name: 'value/is-not-color',
  matcher: ({ token }) => !isColor(token.value),
}
