import type { ContextValue, DeepRawToken } from '../types'
import { compileTokens } from './tokens-compiler'
import { PreprocessorResult, preprocessTokens } from './tokens-preprocessor'
import type { Options } from './types'

export interface CompileOptions extends Options {
  /**
   * List of raw tokens.
   */
  tokens: DeepRawToken[]
}

export type CompileResult = PreprocessorResult

export function createCompiler(context: ContextValue) {
  return function compile(options: CompileOptions) {
    const tokens = compileTokens(options.tokens)
    const result = preprocessTokens({ ...options, context: options.context ?? {}, tokens }, context)

    return result
  }
}
