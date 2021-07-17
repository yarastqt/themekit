import { paramCase } from 'change-case'

import type { Transform } from '../types'

/**
 * Transform which convert name to param-case.
 */
export const transformNameToParamcase: Transform = {
  name: 'name/param-case',
  type: 'name',
  transformer: ({ token }) => paramCase(token.path.join(' ')),
}
