import type { Transform } from '../types'

/**
 * Transform which change name from mapper.
 */
export const transformNameWithMapper: Transform = {
  name: 'name/mapper',
  type: 'name',
  transformer: ({ token, context }) => {
    // TODO: Add unit.
    if (context.mapper) {
      return context.mapper[token.name] || token.name
    }

    return token.name
  },
}
