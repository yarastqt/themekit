import type { Filter } from '../types'
import { isColor } from '../utils/is-color'

export const isColorFilter: Filter = {
  name: 'whitepaper/color', // TODO: Rename this
  matcher: ({ token }) => {
    // @ts-expect-error
    if (isColor(token.value)) {
      // @ts-expect-error (TODO: Fix this type)
      token.group = 'color'
      return true
    }

    return false
  },
}
