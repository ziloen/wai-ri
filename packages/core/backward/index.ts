
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
export function* backward<T>(array: readonly T[]) {
  for (let i = array.length - 1; i >= 0; i--) yield array[i] as T
}

export function* backwardEntries<T>(array: readonly T[]): IterableIterator<[number, T]> {
  for (let i = array.length - 1; i >= 0; i--) yield [i, array[i]] as const
}