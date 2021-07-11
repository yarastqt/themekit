import { createContext } from '../../../context'
import type { PreprocessorOptions } from '../../tokens-preprocessor'

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
    tokens: [
      {
        attributes: {},
        name: '',
        original: { value: 'value-1' },
        path: ['token-1', 'path'],
        refs: [],
        value: 'value-1',
      },
      {
        attributes: {},
        name: '',
        original: { value: 'value-2' },
        path: ['token-2', 'path'],
        refs: [],
        value: 'value-2',
      },
    ],
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
  } as PreprocessorOptions,
  context: context.value,
}
