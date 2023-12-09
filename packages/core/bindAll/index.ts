import type { Fn } from '@wai-ri/shared'
import { asType } from '@wai-ri/shared'

/** 绑定对象上的所有函数 */
export function bindAll<T extends Record<keyof any, any>>(obj: T): T {
  // 使用 for..in 无法获取 enumerable 为 false 的属性
  for (const key of getAllMethods(obj)) {
    obj[key] = (obj[key] as Fn).bind(obj) as T[keyof T]
  }
  return obj
}



type ExtactFnProp<T extends Record<any, any>> = {
  [K in keyof T]: T[K] extends Fn ? K : never
}



/**
 * 获取对象上所有函数，并生成新函数
 * @param obj 
 * @returns 
 */
export function toBound<T extends Record<keyof any, any>>(obj: T): ExtactFnProp<T> {
  const bonded = Object.create(null) as T
  for (const key of getAllMethods(obj)) {
    asType<keyof T>(key)
    bonded[key] = (obj[key] as Fn).bind(obj) as T[typeof key]
  }
  return bonded
}



/** 找出所有可用的方法 */
function getAllMethods<T extends object>(object: T) {
  const methods = new Set<keyof T>
  const proto = Object.prototype

  for (let temp = object; temp !== proto; temp = Reflect.getPrototypeOf(temp)! as T) {
    for (const key of Reflect.ownKeys(temp)) {
      const descriptor = Reflect.getOwnPropertyDescriptor(temp, key)!
      if (!descriptor.writable) continue
      typeof descriptor.value === 'function' && !methods.has(key as keyof T) && methods.add(key as keyof T)
    }
  }
  return methods
}


