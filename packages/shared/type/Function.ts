import type { Fn } from '.'
import type { Length as TupleLen } from './Tuple'
import type { _ } from './_internal'



/** 函数参数长度 函数重载会选最后一个? */
export type Length<T extends Fn> = TupleLen<Parameters<T>>



/** 设置参数类型 */
export type SetParams<T extends Fn, P extends any[]> = T extends Fn<_, infer R> ? Fn<P, R> : never



/** 设置返回类型 */
export type SetReturn<T extends Fn, R> = T extends Fn<infer P> ? Fn<P, R> : never



/** 创建函数类型 */
// export type New<Args extends any[] = any[], Return = any> = (...args: Args) => Return



/** 获取返回类型 */
// export type Return<F extends Fn> = F extends Fn<_, infer R> ? R : never



/** 获取参数类型 */
// export type Parameters<F extends Fn> = F extends Fn<infer P, _> ? P : never



/** 只有一个参数的函数 */
export type UnaryFn<Arg = any, Return = any> = (arg: Arg) => Return



/** TODO: 获取重载数量 */
// export type Overloads<F extends Fn> = 0