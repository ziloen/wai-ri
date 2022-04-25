import type { Fn } from '@wai-ri/shared'

/** 延迟执行 */
export function sleep<P extends any[], R = void>(ms?: number, func?: Fn<P, R>, ...args: P): Promise<R> {
  return new Promise(resolve => setTimeout(() => { resolve(func?.(...args)!) }, ms))
}