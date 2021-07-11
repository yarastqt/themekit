import { createContext } from '../../../context'
import type { PreprocessorOptions } from '../../tokens-preprocessor'

const context = createContext()

export const missingTransform = {
  options: {
    tokens: [],
    output: {
      css: {
        transforms: ['missing-transform'],
        files: [],
      },
    },
  } as PreprocessorOptions,
  context: context.value,
}
