export interface Context {
  /**
   * List of registered transforms.
   */
  transforms: Map<string, Transform>
  /**
   * List of registered formats.
   */
  formats: Map<string, Format>
  /**
   * List of registered filters.
   */
  filters: Map<string, Filter>
}

export interface Format<T = any> {
  name: string
  formatter: (params: { tokens: Token[]; options?: T; context?: Record<string, any> }) => string
}

export interface Transform {
  name: string
  type: 'name' | 'value' | 'attribute'
  transformer: (params: { token: Token; context?: Record<string, any> }) => string
}

export interface Filter {
  name: string
  matcher: (params: { token: Token; context?: Record<string, any> }) => boolean
}

export type TokenValue = string | number | boolean

export interface RawToken {
  value: TokenValue
  comment?: string
}

export interface TokenBase extends RawToken {
  name: string
  value: TokenValue
  path: string[]
  attributes: Record<string, any>
  refs: any[]
}

export interface Token extends TokenBase {
  original: Pick<TokenBase, 'value'>
}
