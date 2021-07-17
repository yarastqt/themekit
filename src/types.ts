export interface Context {
  /**
   *
   */
  value: ContextValue
  /**
   *
   */
  registerFilter: (filter: Filter) => void
  /**
   *
   */
  registerFormat: (format: Format) => void
  /**
   *
   */
  registerTransform: (transform: Transform) => void
  /**
   *
   */
  registerPreset: (preset: Preset) => void
}

export interface ContextValue {
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
  /**
   * List of registered presets.
   */
  presets: Map<string, Preset>
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

export interface Preset {
  name: string
  transforms: string[]
}

export type TokenValue = string | number | boolean

export interface RawToken {
  value: TokenValue
  comment?: string
}

export interface DeepRawToken {
  [key: string]: RawToken | DeepRawToken
}

export interface TokenBase extends RawToken {
  name: string
  value: TokenValue
  path: string[]
  attributes: Record<string, any>
  refs: Pick<TokenBase, 'value' | 'name'>[]
}

export interface Token extends TokenBase {
  original: Pick<TokenBase, 'value'>
}
