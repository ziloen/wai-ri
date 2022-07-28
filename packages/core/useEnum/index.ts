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

  // 创建自定义迭代器 可以 for(const [key, val] of myEnum) {  }
  Reflect.defineProperty(newObj, Symbol.iterator, {
    enumerable: false,
    // 这种会被原始 obj 对象影响，但只有调用时才调用 entries
    // value: () => Object.entries(obj)[Symbol.iterator]()
    // 这种会提前调用 entries 并保存
    value: bindSelf(Object.entries(obj), Symbol.iterator),
  })

  for (const key in obj) {
    newObj[String(newObj[key] = obj[key])] = key
  }

  return Object.freeze(newObj)
}