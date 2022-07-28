import type { FlipLoose } from '@wai-ri/shared'
import { bindSelf } from '../bindSelf'

/** 生成双向映射 */
export function useEnum<T extends Record<string | number, string | number | boolean | null | undefined>>(obj: T)
  : Readonly<
    & T
    & FlipLoose<T>
    & { [Symbol.iterator](): IterableIterator<[keyof T, T[keyof T]]> }
  > {
  const newObj = Object.create(null)

  // 创建自定义迭代器，用于 for..of 循环
  Reflect.defineProperty(newObj, Symbol.iterator, {
    enumerable: false,
    value: bindSelf(Object.entries(obj), Symbol.iterator)
  })

  for (const key in obj) {
    newObj[String(newObj[key] = obj[key])] = key
  }

  return Object.freeze(newObj)
}