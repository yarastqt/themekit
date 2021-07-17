import fg, { Pattern } from 'fast-glob'
import normalize from 'normalize-path'

/**
 * Returns list of matched files by glob with normalized paths.
 *
 * @param pattern - Path with glob pattern.
 * @returns List of matched files.
 */
export function glob(pattern: Pattern | Pattern[]): string[] {
  // Use path normalize for correct using with glob on win systems.
  pattern = Array.isArray(pattern) ? pattern : [pattern]
  pattern = pattern.map((path) => normalize(path))

  return fg.sync(pattern)
}
