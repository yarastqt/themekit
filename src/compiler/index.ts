import type { RawToken } from '../types'
import { compileTokens } from './tokens-compiler'
import { preprocessTokens } from './tokens-preprocessor'
import type { Options } from './types'

export interface CompileOptions extends Options {
  /**
   * List of raw tokens.
   */
  tokens: RawToken[]
}

export function createCompiler(context) {
  return function compile(options: CompileOptions) {
    const tokens = compileTokens(options.tokens)
    const result = preprocessTokens({ ...options, tokens }, context)

    return result
  }
}
