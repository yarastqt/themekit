import YAML from 'yaml'
import { codeFrameColumns } from '@babel/code-frame'

class YamlParseError extends Error {
  public location: any

  constructor(fileName: string, source: string, message: string, location: any) {
    super('')
    // Override native stack with custom message.
    this.stack = new Error(
      [
        // Take only message without code-frame.
        `${message.split(/\n/)[0]} (${fileName}:${location.start.line}:${location.start.col})`,
        codeFrameColumns(source, {
          start: { line: location.start.line, column: location.start.col },
        }),
      ].join('\n'),
    ).stack
    this.location = location
  }
}
export function parse(source: string, path?: string) {
  try {
    return YAML.parse(source, { prettyErrors: true })
  } catch (error) {
    throw new YamlParseError(path, source, error.message, error.linePos)
  }
}
