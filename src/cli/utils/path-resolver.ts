import Module from 'module'
import path from 'path'
import fs from 'fs'

export function resolveFrom(fromDirectory: string, moduleId: string): string | undefined {
  try {
    fromDirectory = fs.realpathSync(fromDirectory)
  } catch (error) {
    if (error.code === 'ENOENT') {
      fromDirectory = path.resolve(fromDirectory)
    } else {
      return
    }
  }

  const fromFile = path.join(fromDirectory, 'noop.js')

  const resolveFileName = () =>
    (Module as any)._resolveFilename(moduleId, {
      id: fromFile,
      filename: fromFile,
      paths: (Module as any)._nodeModulePaths(fromDirectory),
    })

  try {
    return resolveFileName()
  } catch (error) {
    return
  }
}
