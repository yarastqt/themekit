import type { Format, Token } from '../types'

interface CssVariablesFormatOptions {
  /**
   * Custom css selector.
   *
   * @default ':root'
   */
  selector?: string
  /**
   * Use css-variables for aliases.
   *
   * @example
   * :root {
   *   --token-1: var(--token-2);
   *   --token-2: #fff;
   * }
   */
  useAliasVariables?: boolean
}

/**
 * Format which convert tokens to css variables.
 */
export const formatToCssVariables: Format<CssVariablesFormatOptions> = {
  name: 'css/variables',
  formatter: ({ tokens, options, context = {} }) => {
    const defaultOptions = { selector: ':root', useAliasVariables: false }
    const { selector: originalSelector, useAliasVariables } = { ...defaultOptions, ...options }
    const { entry, platform } = context

    const selector = originalSelector
      .replace(/\[entry\]/g, entry)
      .replace(/\[platform\]/g, platform)

    return `${selector} {\n${variablesWithPrefix(tokens, useAliasVariables)}\n}\n`
  },
}

function variablesWithPrefix(tokens: Token[], useAliasVariables: boolean): string {
  const tokenToString = (token: Token) => {
    if (useAliasVariables && token.refs.length > 0) {
      for (const ref of token.refs) {
        token.value = String(token.value).replace(String(ref.value), `var(--${ref.name})`)
      }
    }

    const nextProp = [`--${token.name}: ${token.value};`]

    if (token.comment) {
      nextProp.push(` /* ${token.comment} /*`)
    }

    return nextProp.join('')
  }

  return tokens.map(tokenToString).filter(Boolean).join('\n')
}
