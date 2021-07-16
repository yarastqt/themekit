import { compile } from '../index'
import { CompileResult, CompileOptions } from '../compiler'
import { DeepRawToken, TokenValue } from '../types'

export type Watcher = (payload: CompileResult) => void
type Compile = typeof compile

export class ThemekitObserver {
  private tokens: DeepRawToken[]
  private options: CompileOptions
  private compile: Compile
  private watchers: Set<Watcher> = new Set()

  constructor(options: CompileOptions, _compile: Compile = compile) {
    this.compile = _compile
    this.tokens = options.tokens
    this.options = options
    this.run(options)
  }

  watch(watcher: Watcher) {
    this.watchers.add(watcher)

    return () => {
      this.watchers.delete(watcher)
    }
  }

  update(token: string, value: TokenValue) {
    const tokens = [...this.tokens, { [token]: { value } }]
    const options = { ...this.options, tokens }

    this.run(options)
  }

  private run(options: CompileOptions) {
    setImmediate(() => {
      this.emit(this.compile(options))
    })
  }

  private emit(payload) {
    for (const watcher of this.watchers) {
      watcher(payload)
    }
  }
}
