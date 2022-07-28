


// 适用情况 - 不想多写一行
// const obj = new Some()
// const fn = obj.fn.bind(obj)
// 简写成一行
// const fn = bindSelf(new Some(), 'fn')

import { Fn } from '@wai-ri/shared'

/** 
 * 绑定对象函数 this 为对象本身
 */
export function bindSelf<T extends Record<any, any>, K extends keyof T>(obj: T, key: T[K] extends Fn ? K : never): T[K] {
  return Function.prototype.bind.call(Reflect.get(obj, key), obj)
}


