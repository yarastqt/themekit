import type { Transform } from '../types'

/**
 * Transform which change name from mapper.
 */
export const transformNameWithMapper: Transform = {
  name: 'name/mapper',
  type: 'name',
  transformer: ({ token, context }) => context.mapper[token.name] || token.name,
}
