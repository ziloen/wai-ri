
/**
 * Iterates over an array backward.
 * @example
 * ```ts
 * const array = [1, 2, 3]
 * for (const item of backward(array)) {
 *   console.log(item)
 * }
 * // 3 2 1
 * ```
 */
export function* backward<T>(array: T[]) {
  for (let i = array.length - 1; i >= 0; i--) yield array[i]
}