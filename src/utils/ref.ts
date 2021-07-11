type RefObject<T> = { current: T }

/**
 * Create container for store value.
 *
 * @pram value - Initial value.
 * @returns Container with stored value.
 */
export function createRef<T>(value: T = null): RefObject<T> {
  return { current: value }
}
