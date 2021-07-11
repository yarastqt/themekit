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

context.registerFilter({
  name: 'filter-1',
  matcher: ({ token }) => String(token.value).match(/-1/) !== null,
})

context.registerFilter({
  name: 'filter-2',
  matcher: ({ token }) => String(token.value).match(/-2/) !== null,
})

export const filter = {
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
            destination: 'tokens-1.css',
            format: 'format',
            filter: 'filter-1',
          },
          {
            destination: 'tokens-2.css',
            format: 'format',
            filter: 'filter-2',
          },
        ],
      },
    },
  } as PreprocessorOptions,
  context: context.value,
}
