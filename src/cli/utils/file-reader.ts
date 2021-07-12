import { extname } from 'path'
import { readFileSync } from 'fs-extra'

import { parse as parseYaml } from '../../parsers/yaml-parser'
import { parse as parseJson } from '../../parsers/json-parser'

export function readFile(path: string) {
  const source = readFileSync(path, 'utf8')

  switch (extname(path)) {
    case '.yml':
    case '.yaml':
      return parseYaml(source, path)
    case '.json':
      return parseJson(source, path)
    default:
      throw new Error(`Unsupported file extension: "${path}".`)
  }
}
