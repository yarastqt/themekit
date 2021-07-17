import { dirname, join } from 'path'
import readPkgUp from 'read-pkg-up'

export function findPackageRoot(path: string): string {
  const data = readPkgUp.sync({ cwd: path })
  if (data === undefined) {
    throw new Error('Cannot find package root, please check exists package.json.')
  }
  if (data.packageJson.version !== '' && data.packageJson.name !== '') {
    return dirname(data.path)
  }
  const prevDir = join(dirname(data.path), '..')
  return findPackageRoot(prevDir)
}
