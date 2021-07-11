import { createContext } from '../../../context'
import type { PreprocessorOptions } from '../../tokens-preprocessor'

const context = createContext()

context.registerTransform({
  name: 'transform',
  type: 'value',
  transformer: () => null,
})

context.registerFormat({
  name: 'format',
  formatter: () => null,
})

export const missingFilter = {
  options: {
    tokens: [],
    output: {
      css: {
        transforms: ['transform'],
        files: [
          {
            destination: '',
            format: 'format',
            filter: 'missing-filter',
          },
        ],
      },
    },
  } as PreprocessorOptions,
  context: context.value,
}
