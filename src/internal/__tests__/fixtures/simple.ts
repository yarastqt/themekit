import { createContext } from '../../../context'
import type { CompileOptions } from '../../../compiler'

const context = createContext()

context.registerTransform({
  name: 'transform',
  type: 'name',
  transformer: ({ token }) => token.path.join('-'),
})

context.registerFormat({
  name: 'format',
  formatter: ({ tokens }) => {
    const result = []
    for (const token of tokens) {
      result.push(`${token.name}:${token.value}`)
    }
    return result.join(',')
  },
})

export const simple = {
  options: {
    tokens: [{ token1: { value: 'value-1' } }, { token2: { value: 'value-2' } }],
    output: {
      css: {
        transforms: ['transform'],
        files: [
          {
            destination: 'tokens.css',
            format: 'format',
          },
        ],
      },
    },
  } as CompileOptions,
  context: context.value,
}
