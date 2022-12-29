import { Fn } from '@wai-ri/shared'

/** 绑定对象上的所有函数 */
export function bindAll<T extends Record<keyof any, any>>(obj: T): T {
  // 使用 for..in 无法获取 enumerable 为 false 的属性
  for (const key of getAllMethods(obj)) {
    obj[key as keyof T] = (obj[key] as Fn).bind(obj) as T[keyof T]
  }
  return obj
}


/** 找出所有可用的方法 */
function getAllMethods(object: object) {
  const methods = new Set<string | symbol>
  const proto = Object.prototype

  for (let temp = object; temp !== proto; temp = Reflect.getPrototypeOf(temp)!) {
    for (const key of Reflect.ownKeys(temp)) {
      const descriptor = Reflect.getOwnPropertyDescriptor(temp, key)!
      if (!descriptor.writable) continue
      typeof descriptor.value === 'function' && !methods.has(key) && methods.add(key)
    }
  }
  return methods
}


