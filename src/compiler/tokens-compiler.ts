import type { Token } from '../types'
import { deepMerge } from '../utils/deep-merge'
import { tokenize } from './tokenizer'
import { resolveTokensAliases } from './tokens-resolver'

/**
 * Compiles input tokens, creates token struct and resolves value aliases.
 *
 * @param tokens - Input tokens.
 * @returns Compiled tokens.
 */
export function compileTokens(tokens: any[]): Token[] {
  tokens = deepMerge(tokens)
  tokens = tokenize(tokens)
  tokens = resolveTokensAliases(tokens)

  return tokens
}
