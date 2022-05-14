import type { ExpandDeep, ReverseLoose } from '@wai-ri/shared'

/** 生成双向映射 */
export function useEnum<T extends Record<string | number, string | number | boolean | null | undefined>>(obj: T)
  : Readonly<
    & T
    & ReverseLoose<T>
    & { [Symbol.iterator](): IterableIterator<[keyof T, T[keyof T]]> }
  > {
  const newObj = Object.create(null)

  // 创建自定义迭代器 可以 for(const [key, val] of myEnum) {  }
  Reflect.defineProperty(newObj, Symbol.iterator, {
    enumerable: false,
    value: () => Object.entries(obj)[Symbol.iterator]()
  })

  for (const key in obj) {
    newObj[String(newObj[key] = obj[key])] = key
  }

  return Object.freeze(newObj)
}