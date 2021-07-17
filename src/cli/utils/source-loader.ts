import { basename } from 'path'

import type { DeepRawToken } from '../../types'
import { Platforms, platforms } from '../legacy/platforms'
import { readFile } from './file-reader'
import { glob } from './glob'

export function loadSources(paths: string[][], platform: Platforms): string[] {
  const result = []
  const levels = platforms.get(platform)

  if (levels === undefined) {
    throw new Error(`Unexpected platform: ${platform}, please check configuration.`)
  }

  // А может быть тут стоит сперва сделать flat в нужном порядке, а затем заинжектить?

  // console.log('>>> paths', paths)
  // Uses nested array with paths, cuz glob not save orders with using patterns for path.
  // Also uses sort after glob for idempotent result.
  const resolvedPaths = paths.map((path) => glob(path).sort())

  const files = resolvedPaths
    // .flatMap((value) => value)
    .flat()
    .filter((file) => {
      const filePlatform = getPlatformFromFilePath(file)
      return levels.includes(filePlatform)
    })
    .sort((a, b) => {
      const a1 = getPlatformFromFilePath(a)
      const b1 = getPlatformFromFilePath(b)
      return levels.indexOf(a1) - levels.indexOf(b1)
    })

  for (const file of files) {
    const tokens = readFile<DeepRawToken | null>(file)

    if (tokens) {
      result.push(tokens)
    }
  }

  return result
}

// TODO: Надо посмотреть насколько актуальна данная фича вообще
function getPlatformFromFilePath(filePath: string): Platforms {
  const fileName = basename(filePath)
  const matched = fileName.match(/@([\w|-]+)+\./)

  return matched === null ? 'common' : (matched[1] as Platforms)
}
