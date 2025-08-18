import type { Expand, FlipLoose, Stringable } from '@wai-ri/shared'
import { bindSelf } from '../bindSelf'


/** 
 * 生成双向映射 
 * 
 * ```ts
 * const Status = useEnum({
 *   Pending: 'pending',
 *   Success: 'success',
 *   Error: 'error'
 * })
 * console.log(Status.Pending) // 'pending'
 * console.log(Status.pending) // 'Pending'
 * ```
 */
export function useEnum<const T extends Record<string | number, Stringable>>(obj: T): Expand<Readonly<
  & T
  & FlipLoose<T>
  & { [Symbol.iterator](): IterableIterator<[keyof T, T[keyof T]]> }
>> {
  const newObj = Object.create(null) as Record<string, unknown>

  // 创建自定义迭代器，用于 for..of 循环
  Reflect.defineProperty(newObj, Symbol.iterator, {
    enumerable: false,
    value: bindSelf(Object.entries(obj), Symbol.iterator)
  })

  // 双向映射
  for (const key in obj) {
    newObj[String(newObj[key] = obj[key])] = key
  }

  return Object.freeze(newObj) as Expand<Readonly<
    & T
    & FlipLoose<T>
    & { [Symbol.iterator](): IterableIterator<[keyof T, T[keyof T]]> }
  >>
}