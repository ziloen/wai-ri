
/**
 * 参考：https://github.com/millsp/ts-toolbelt
 */
export * as Function from './Function'
export * as Number from './Number'
export * as String from './String'
export * as Tuple from './Tuple'
export * as Union from './Union'



import type { SetParams, UnaryFn } from './Function'
import type { IsUnion, ToTuple } from './Union'
import type { Stringable, _ } from './_internal'



/** 对象类型，用来取代 object | {} */
export type ObjectType<K extends keyof any = keyof any, V = unknown> = Record<K, V>


/** 函数 */
export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return



/** 异步函数 */
export type AsyncFn<Args extends any[] = any[], Return = any> = (...args: Args) => Promise<Return>



/** 数组的元素类型 */
// export type ArrayType<A extends any[]> = A extends Array<infer P> ? P : never
export type ArrayType<A extends any[]> = A[number]



/** T 类型 L 长度的 Tuple */
export type FixedArray<T, L extends number, A extends unknown[] = []> = A['length'] extends L ? A : FixedArray<T, L, [T, ...A]>



/** F 异步函数的返回 异步 数据类型 */
export type AwaitedReturn<F extends AsyncFn> = Awaited<ReturnType<F>>



/** O 对象的 value 类型 */
export type ValueOf<O extends Record<keyof any, any>> = O[keyof O]



/** 扩展 为 可以是数组 */
export type Arrayable<T> = T | T[]



/** 根据 value 获取 key 类型 */
export type KeysMatching<Obj, Val> = { [Key in keyof Obj]-?: Obj[Key] extends Val ? Key : never }[keyof Obj]
// 另一种 解法
// export type KeysMatching<Obj, Val> = keyof { [Key in keyof Obj as (Obj[Key] extends Val ? Key : never)]: Key }



/** 相等 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false



/** 是否为 any */
export type IsAny<T> = 0 extends (1 & T) ? true : false



/** 翻转对象键与值 */
export type Flip<Obj extends Record<string, string | number | boolean>> = {
  [Key in keyof Obj as `${Obj[Key]}`]: Key
}
/** 翻转对象键与值 更宽松 */
export type FlipLoose<Obj extends Record<string | number, Stringable>> = {
  [Key in keyof Obj as Obj[Key] extends keyof any ? Obj[Key] : Obj[Key] extends Stringable ? `${Obj[Key]}` : never]: Key extends Stringable ? `${Key}` : never
}



/** 展开类型 */
export type Expand<T> = ExpandDeep<T, 3>



/** 递归展开 */
export type ExpandDeep<
  T,
  TargetDeep extends number = 5,
  DeepArr extends any[] = [],
  NowDeep extends number = DeepArr['length'],
  Next extends any[] = [...DeepArr, _]
> =
  // 已到达深度，结束
  NowDeep extends TargetDeep ? T :
  // 对象类型
  T extends ObjectType ? { [K in keyof T]: ExpandDeep<T[K], TargetDeep, Next> } :
  // 联合类型
  IsUnion<T> extends true ? ExpandDeep<ToTuple<T>[number], TargetDeep, Next> :
  // 函数类型
  T extends Fn<infer Params, infer Return> ? Fn<ExpandDeep<Params, TargetDeep, Next>, ExpandDeep<Return, TargetDeep, Next>> :
  // Promise 类型
  T extends Promise<infer P> ? Promise<ExpandDeep<P, TargetDeep, Next>> :
  T



/** 管道函数 参数类型 */
type PipeParams<Funcs extends UnaryFn[], SourceT = never, Len = Funcs['length']> =
  Len extends 0
  ? []
  : Funcs extends [infer First extends UnaryFn, infer Second extends UnaryFn, ...infer Rest extends UnaryFn[]]
  ? [
    // [SourceT] extends [never] ? First :
    SetParams<First, [SourceT]>,

    ...PipeParams<
      [SetParams<Second, [ReturnType<First>]>, ...Rest],
      ReturnType<First>
    >
  ]
  : Funcs

/** 管道函数 返回类型 */
type PipeReturn<Funcs extends UnaryFn[], FirstArg = never,> = Funcs extends [...unknown[], (arg: any) => infer R] ? R : FirstArg

// declare function pipe<Funcs extends UnaryFn[]>(...args: PipeParams<Funcs, number>): PipeReturn<Funcs, number>

// 测试 pipe ---
// declare function num2str(a: number): string
// declare function num2boo(a: number): boolean
// declare function str2num(a: string): number
// declare function str2boo(a: string): boolean
// declare function boo2num(a: boolean): number
// declare function boo2str(a: boolean): string

// pipe(num2str, str2num, num2boo, boo2num)
// // @ts-expect-error 'number' not assignable to 'string'
// pipe(str2num, num2boo, boo2num)
// // @ts-expect-error 'boolean' not assignable to 'string'
// pipe(num2boo, str2num, num2boo)
// pipe(num2boo, boo2str)
// // @ts-expect-error 'boolean' not assignable to 'number'
// pipe(num2boo, num2str)
// pipe(num2boo)
// pipe()




/** 用 New 类型 扩展 Org 类型*/
export type Assign<Org extends ObjectType, New extends ObjectType> = Expand<New & Omit<Org, keyof New>>



/** 可扩展类型 */
export type Extensible<O extends ObjectType> = ExpandDeep<O & { [K: keyof any]: unknown }, 1>



/** 使两属性互斥，不是线程互斥锁，Disjoint / Mutex / MutuallyExclusive */
export type Mutex<T, K1 extends keyof T, K2 extends keyof T> =
  { [K in Exclude<keyof T, K1 | K2>]: T[K] } &
  (
    { [K in K1]?: never } & { [K in K2]: T[K] } |
    { [K in K2]?: never } & { [K in K1]: T[K] }
  )
// ({ [P in Exclude<K, K1>]: T[P] } & { [P in K1]?: never }) |
// ({ [P in Exclude<K, K2>]: T[P] } & { [P in K2]?: never })