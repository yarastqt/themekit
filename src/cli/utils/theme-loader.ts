import { join, resolve, dirname } from 'path'
import { readJsonSync, existsSync } from 'fs-extra'
import merge from 'deepmerge'

import { resolveFrom } from './path-resolver'
import { findPackageRoot } from './package-resolver'

type Platforms = any

export function loadTheme(source: string, root: string = process.cwd()): OutputTheme {
  // TODO: use ref?
  let derivedTheme: OutputTheme = {
    mappers: [],
    sources: [],
    platforms: ['common'],
  }
  const theme: InputTheme = readJsonSync(source)
  const packageRootPath = findPackageRoot(root)

  if (theme.extends !== undefined) {
    const parentThemePath = resolveFrom(packageRootPath, theme.extends)
    if (parentThemePath && existsSync(parentThemePath)) {
      const parentThemeCwd = dirname(parentThemePath)
      const parentTheme = loadTheme(parentThemePath, parentThemeCwd)
      // Platforms should be defined at project theme.
      derivedTheme = merge(derivedTheme, { ...parentTheme, platforms: [] })
    } else {
      throw new Error(`Cannot load theme: "${theme.extends}".`)
    }
  }

  if (theme.platforms !== undefined) {
    derivedTheme.platforms = theme.platforms
  }

  if (theme.mappers !== undefined) {
    derivedTheme.mappers.push(...theme.mappers.map((filePath) => join(packageRootPath, filePath)))
  }

  for (const source of theme.sources) {
    // Makes array of arrays with each source for save order after glob.
    derivedTheme.sources.push([resolve(packageRootPath, source)])
  }

  return derivedTheme
}

// TODO: rewrite to interface
type InputTheme = {
  mappers: string[]
  sources: string[]
  platforms: Platforms[]
  extends?: string
}

type OutputTheme = {
  mappers: string[]
  // Uses nested array with paths, cuz glob not save orders with using patterns for path.
  sources: string[][]
  platforms: Platforms[]
}
