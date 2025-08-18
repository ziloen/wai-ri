import type { Fn } from '@wai-ri/shared'
import { asType, isFn } from '@wai-ri/shared'



/**
 * 绑定对象函数 this 为对象本身
 */
export function bindSelf<
  T extends Record<PropertyKey, any>,
  K extends keyof T
>(obj: T, key: T[K] extends Fn ? K : never): T[K]
export function bindSelf<T extends Record<PropertyKey, any>>(obj: T, key: (keyof T)[]): T
export function bindSelf<T extends Record<PropertyKey, any>, K extends keyof T>(obj: T, key: K | K[]) {
  if (Array.isArray(key)) {
    (key as (keyof T)[]).forEach((k) => {
      const fn = obj[k]
      isFn(fn) && Reflect.set(obj, k, (fn as Fn).bind(obj))
    })
    return obj
  } else {
    asType<keyof T>(key)
    const fn = obj[key]
    isFn(fn) && Reflect.set(obj, key, (fn as Fn).bind(obj))
    return obj[key] as Fn
  }
}