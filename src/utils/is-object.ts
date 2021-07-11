/**
 * Checks value for object-like.
 *
 * @param target - Any value.
 * @returns Value is object.
 */
export function isObject(value: unknown): value is Object {
  return Object.prototype.toString.call(value) === '[object Object]'
}
