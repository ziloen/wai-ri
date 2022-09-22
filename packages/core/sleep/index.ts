import type { Fn } from '@wai-ri/shared'



/** 等待 0 毫秒 */
export function sleep(): Promise<void>
/** 等待`ms`毫秒 */
export function sleep(ms: number): Promise<void>
/** 等待`ms`毫秒后执行函数 */
export function sleep<P extends any[], R = void>(ms: number, fn: Fn<P, R>, ...args: P): Promise<R>
export function sleep<P extends any[], R = void>(ms?: number, fn?: Fn<P, R>, ...args: P): Promise<R | void> {
  return new Promise(res => setTimeout(() => res(fn?.(...args)), ms))
}