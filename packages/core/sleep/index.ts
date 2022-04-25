import type { Fn } from '@wai-ri/shared'

/** 延迟执行 */
export function sleep<Params extends any[], Return>(ms?: number, func?: Fn<Params, Return>, ...args: Params): Promise<Return | void> {
  return new Promise(resolve => setTimeout(() => { resolve(func?.(...args)) }, ms))
}