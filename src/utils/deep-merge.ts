import deepmerge from 'deepmerge'

/**
 * Merges list of objects into one object.
 *
 * @param target - List of objects.
 * @returns Merged object.
 */
export function deepMerge<T>(target: any[]): T {
  return deepmerge.all<T>(target)
}
