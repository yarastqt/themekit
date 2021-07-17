import { readFile } from './file-reader'
import { glob } from './glob'

export function loadMapper(paths: []): Record<string, string> {
  const result = {}
  const files = glob(paths)

  for (const file of files) {
    const tokens = readFile<any | null>(file)

    if (tokens) {
      Object.assign(result, tokens)
    }
  }

  return result
}
