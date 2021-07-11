import { createContext } from '../../../context'
import type { PreprocessorOptions } from '../../tokens-preprocessor'

const context = createContext()

context.registerTransform({
  name: 'transform',
  type: 'value',
  transformer: () => null,
})

export const missingFormat = {
  options: {
    tokens: [],
    output: {
      css: {
        transforms: ['transform'],
        files: [
          {
            destination: '',
            format: 'missing-format',
          },
        ],
      },
    },
  } as PreprocessorOptions,
  context: context.value,
}
