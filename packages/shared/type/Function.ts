import type { Fn } from '.'
import type * as Union from './Union'

// TODO: 函数
/** 函数参数长度 函数重载会选最后一个? */
export type Length<T extends Fn> = Union.Length<Parameters<T>>



/** 设置参数类型 */
export type SetParams<T extends Fn, P extends any[]> = T extends Fn<any[], infer R> ? Fn<P, R> : never



/** 设置返回类型 */
export type SetReturn<T extends Fn, R> = T extends Fn<infer P, any> ? Fn<P, R> : never



export type New<Args extends any[] = any[], Return = any> = (...args: Args) => Return
