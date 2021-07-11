import { paramCase } from 'change-case'

import type { Transform } from '../types'

/**
 * Transform which convert name to kebab-case.
 */
export const transformNameToKebabCase: Transform = {
  name: 'name/cti/kebab',
  type: 'name',
  transformer: ({ token }) => paramCase(token.path.join(' ')),
}
