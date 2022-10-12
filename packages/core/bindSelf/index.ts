import { Fn } from '@wai-ri/shared'



/**
 * 绑定对象函数 this 为对象本身
 */
export function bindSelf<T extends Record<keyof any, any>, K extends keyof T>(obj: T, key: T[K] extends Fn ? K : never): T[K]
export function bindSelf<T extends Record<keyof any, any>, K extends (keyof T)[]>(obj: T, key: K): T
export function bindSelf<T extends Record<keyof any, any>, K extends keyof T | (keyof T)[]>(obj: T, key: K) {
  if (Array.isArray(key)) {
    key.forEach(k => {
      Reflect.set(obj, k, Function.prototype.bind.call(Reflect.get(obj, k), obj))
    })
    return obj
  } else {
    Reflect.set(obj, key, Function.prototype.bind.call(Reflect.get(obj, key), obj))
    return Reflect.get(obj, key)
  }
}