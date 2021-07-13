import type { Format } from '../types'

/**
 * Format which convert tokens to flat json.
 */
export const formatToFlatJson: Format = {
  name: 'json/flat',
  formatter: ({ tokens }) => JSON.stringify(tokens, null, 2),
}
