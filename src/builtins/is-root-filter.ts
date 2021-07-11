import type { Filter } from '../types'
import { isColor } from '../utils/is-color'

// TODO: Как лучше назвать надо подумать
export const isRootFilter: Filter = {
  name: 'whitepaper/root', // TODO: Rename this
  matcher: ({ token }) => {
    // @ts-expect-error
    if (!isColor(token.value)) {
      // @ts-expect-error (TODO: Fix this type)
      token.group = 'root'
      return true
    }

    return false
  },
}
