import type { Context } from '../types'

// All builtin formats.
import { formatToCssVariables } from './css-variables-format'
// All builtin transformers.
import { transformNameToKebabCase } from './name-kebab-transform'
import { transformValueWithColorFn } from './value-color-function-transform'
// All builtin filters.
import { isValueColorFilter } from './is-value-color-filter'
import { isValueNotColorFilter } from './is-value-not-color-filter'

export function registerBuiltins(context: Context) {
  // Register builins formats.
  context.registerFormat(formatToCssVariables)

  // Register builins transforms.
  context.registerTransform(transformNameToKebabCase)
  context.registerTransform(transformValueWithColorFn)

  // Register builins filters.
  context.registerFilter(isValueColorFilter)
  context.registerFilter(isValueNotColorFilter)
}
