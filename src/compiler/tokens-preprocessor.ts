import type { ContextValue, Token } from '../types'
import {
  NotFoundFilterException,
  NotFoundFormatException,
  NotFoundPresetException,
  NotFoundTransformException,
} from './errors'
import type { Options } from './types'

export type ResultFile = { destination: string; content: string }
export type PreprocessorResult = Record<string, ResultFile[]>

export interface PreprocessorOptions extends Options {
  /**
   * List of compiled tokens.
   */
  tokens: Token[]
}

/**
 * Returns tokens with applied transforms, format and filter.
 *
 * @param options - Options for preprocessing.
 * @param context - Programm context.
 * @returns Preprocessed tokens.
 */
export function preprocessTokens(options: PreprocessorOptions, context: ContextValue) {
  const result: PreprocessorResult = {}

  for (const output of Object.entries(options.output)) {
    const [name, config] = output
    const { transforms = [], files, preset: presetName } = config

    if (presetName) {
      const preset = context.presets.get(presetName)

      if (!preset) {
        throw new NotFoundPresetException(presetName)
      }

      transforms.push(...preset.transforms)
    }

    result[name] = []

    for (const transformName of transforms) {
      const transform = context.transforms.get(transformName)

      if (!transform) {
        throw new NotFoundTransformException(transformName)
      }

      for (const token of options.tokens) {
        token[transform.type] = transform.transformer({ token, context: options.context })
      }
    }

    for (const file of files) {
      const format = context.formats.get(file.format)

      if (!format) {
        throw new NotFoundFormatException(file.format)
      }

      let content: string

      if (file.filter) {
        const filter = context.filters.get(file.filter)

        if (!filter) {
          throw new NotFoundFilterException(file.filter)
        }

        content = format.formatter({
          tokens: options.tokens.filter((token) =>
            filter.matcher({ token, context: options.context }),
          ),
          options: file.options,
          context: options.context,
        })
      } else {
        content = format.formatter({
          tokens: options.tokens,
          options: file.options,
          context: options.context,
        })
      }

      result[name].push({
        destination: file.destination,
        content,
      })
    }
  }

  return result
}
