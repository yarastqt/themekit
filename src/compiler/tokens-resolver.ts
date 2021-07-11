import type { Token, TokenValue } from '../types'
import { isAlias } from '../utils/is-alias'
import { createRef } from '../utils/ref'
import { CircularRefsException } from './errors'

const tokensRef = createRef()
// Use map for cache tokens (get token with O(1) operations) indexes with path as key.
const indexCache = new Map<string, string>()

/**
 * Resolves tokens value aliases.
 *
 * @param tokens - Compiled tokens list.
 * @returns Tokens with resolved aliases.
 */
export function resolveTokensAliases(tokens: Token[]): Token[] {
  tokensRef.current = tokens

  for (const index in tokens) {
    // TODO: Create key and resolve without value postfix.
    const key = tokens[index].path.concat('value').join('.')
    indexCache.set(key, index)
  }

  for (const token of tokens) {
    if (isAlias(token.value)) {
      const compileResult = resolveValueAliases(token.value)
      token.refs = compileResult.refs
      token.value = compileResult.value
    }
  }

  return tokens
}

function resolveValueAliases(value: TokenValue, visited = new Set<string>()) {
  const result = { value, refs: [] }

  let aliasRegExp = /{([^}]+)}/g
  let matches

  while ((matches = aliasRegExp.exec(String(value))) !== null) {
    const [match, alias] = matches

    if (visited.has(alias)) {
      throw new CircularRefsException([...visited, alias])
    } else {
      visited.add(alias)
    }

    const refToken = tokensRef.current[indexCache.get(alias)]

    if (isAlias(refToken.value)) {
      const compileResult = resolveValueAliases(refToken.value, visited)
      refToken.refs = compileResult.refs
      refToken.value = compileResult.value
    }

    result.refs.push(refToken)
    result.value = String(result.value).replace(match, refToken.value)
  }

  return result
}
