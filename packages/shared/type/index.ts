
/**
 * 参考：https://github.com/millsp/ts-toolbelt
 */


export * as Function from './Function'
export * as Number from './Number'
export * as String from './String'
export * as Tuple from './Tuple'
export * as Union from './Union'



/** 对象类型，用来取代 object | {} */
export type ObjectType<K extends keyof any = keyof any, V = unknown> = Record<K, V>


/** 函数 */
export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return
/** 异步函数 */
export type AsyncFn<Args extends any[] = any[], Return = any> = (...args: Args) => Promise<Return>



/** 数组的元素类型 */
export type ArrayType<A extends any[]> = A extends Array<infer P> ? P : never



/** T 类型 L 长度的 Tuple */
export type FixedArray<T, L extends number, A extends unknown[] = []> = A['length'] extends L ? A : FixedArray<T, L, [T, ...A]>



/** F 异步函数的返回 异步 数据类型 */
export type AwaitedReturnType<F extends AsyncFn> = Awaited<ReturnType<F>>



/** O 对象的 value 类型 */
export type ValueOf<O extends Record<keyof any, any>> = O[keyof O]



/** 扩展 为 可以是数组 */
export type Arrayable<T> = T | T[]



/** 根据 value 获取 key 类型 */
export type KeysMatching<Obj, Val> = { [Key in keyof Obj]-?: Obj[Key] extends Val ? Key : never }[keyof Obj]
// 另一种 解法
// export type KeysMatching<Obj, Val> = keyof { [Key in keyof Obj as (Obj[Key] extends Val ? Key : never)]: Key }



type SetValuesToString<T extends Record<keyof any, keyof any | boolean | null | undefined>> = {
  [K in keyof T]:
  T[K] extends keyof any ? T[K] :
  T[K] extends true ? 'true' :
  T[K] extends false ? 'false' :
  T[K] extends null ? 'null' :
  T[K] extends undefined ? 'undefined' :
  never
}

/** 反转 对象 值与键 */
export type Reverse<Obj extends Record<keyof Obj, Obj[keyof Obj]>> = { [Val in ValueOf<Obj>]: KeysMatching<Obj, Val> }
export type ReverseLoose<T extends Record<keyof any, keyof any | boolean | null | undefined>> = Reverse<SetValuesToString<T>>



/** 反转 Tuple 顺序 */
export type ReverseTuple<T extends readonly unknown[]> = T extends [...infer Rest, infer Last] ? [Last, ...ReverseTuple<Rest>] : []



// 一堆工具
type IsUnion<T, U = T> = T extends U ? [U] extends [T] ? false : true : never
type UnionToIntersection<U> = (U extends any ? Fn<[U]> : never) extends Fn<[infer Arg]> ? Arg : never
type UnionLast<T> = UnionToIntersection<T extends unknown ? Fn<[T]> : never> extends Fn<[infer A]> ? A : never
type UnionToTuple<U, Last = UnionLast<U>> = [U] extends [never] ? [] : [Last, ...UnionToTuple<Exclude<U, Last>>]



/** 展开类型 */
export type Expand<T, Deep extends 0 | 1 | 2 = 2> =
  Deep extends 0 ? T :
  T extends ObjectType ? { [K in keyof T]: Expand<T[K], Deep extends 2 ? 1 : 0> } :
  IsUnion<T> extends true ? Expand<UnionToTuple<T>[number], Deep extends 2 ? 1 : 0> :
  T extends Fn<infer Params, infer Return> ? Fn<Expand<Params, Deep extends 2 ? 1 : 0>, Expand<Return, Deep extends 2 ? 1 : 0>> :
  T extends Promise<infer Pro> ? Promise<Expand<Pro, Deep extends 2 ? 1 : 0>> :
  T



/** 递归展开，TODO: 增加递归深度？递归类型？ */
export type ExpandDeep<T, Deep extends number = 5> =
  T extends ObjectType ? { [K in keyof T]: ExpandDeep<T[K]> } :
  IsUnion<T> extends true ? ExpandDeep<UnionToTuple<T>[number]> :
  T extends Fn<infer Params, infer Return> ? Fn<ExpandDeep<Params>, ExpandDeep<Return>> :
  T extends Promise<infer Pro> ? Promise<ExpandDeep<Pro>> :
  T



/** pipe 函数类型 */
// export type Pipe<T extends ((...args: any) => any) = any, N extends ((...args: any) => any) = any> = [T, N]
// import { flow } from 'lodash-es'
// import { OperatorFunction } from 'rxjs'
// 去除第一个
// type Tail<T extends unknown[]> = T extends [any, ...infer L] ? L : []
// Array / Truple 操作
// type Unshift<Arr extends unknown[], T> = [T, ...Arr]
// type Push<Arr extends unknown[], T> = [...Arr, T]
// type Pop<Arr extends unknown[]> = Arr extends readonly [...infer Rest, any] ? Rest : []
// type Shift<Arr extends unknown[]> = Arr extends readonly [any, ...infer L] ? L : []
// type Concat<Arr1 extends unknown[], Arr2 extends unknown[]> = [...Arr1, ...Arr2]



// type Head<Arr extends unknown[]> = Arr extends [infer F, ...infer L] ? F : never
type Last<Arr extends unknown[]> = Arr extends [...infer F, infer L] ? L : never

// type GetTuple<T extends number, R extends any[] = []> = R["length"] extends T ? R : GetTuple<T, [...R, any]>

// type Add<T1 extends number, T2 extends number> = [...GetTuple<T1>, ...GetTuple<T2>]["length"]
// type Minus<N1 extends number, N2 extends number> = []['length']

// 获取 Array / Turple 长度
// type Len<Arr extends any[]> = Arr['length']
// type FnType<Arg, Return> = (arg: Arg) => Return

// pipe<First, Lenth = 0>
// 如果 检查 Pipe<First, 0> extends [(arg: FirstParam) => infer FirstReturn] ? [(arg: FirstParam) => FirstReturn] :


// type Func = (...args: any[]) => any
// type Pipe<FirstArg = never, LastArg = never> = [FirstArg] extends [never] ? [] : Head<Pipe<FirstArg> extends [(arg: FirstArg) => infer R] ? [(arg: FirstArg) => R] : []> extends FnType<FirstArg, infer Return> ? [FnType<FirstArg, Return>, ...Pipe<Return>] : []

// declare function pipe<F, L>(...args: Pipe<F, L>): L
// declare function pipe<T extends Func, U extends Func, R extends Func>(...functions: [T, ...U[], R]) : (...args: Parameters<T>) => ReturnType<R>;


type UnaryFn = (arg: any) => any
type SetFnParams<T, P extends any[]> = T extends (...arg: any[]) => infer R ? (...args: P) => R : never
type SetFnReturn<T, R> = T extends (...args: infer P) => any ? (...args: P) => R : never
type UnaryReturnType<T> = T extends (arg: any) => infer R ? R : any



export type PipeParams<Funcs extends UnaryFn[], SourceT = never, Len = Funcs['length']> =
  Len extends 0
  ? []
  : Funcs extends [infer First, infer Second, ...infer Rest]
  ? [
    ([SourceT] extends [never]
      ? First
      : SetFnParams<First, [SourceT]>),

    ...PipeParams<
      Rest extends UnaryFn[]
      ? First extends UnaryFn
      ? Second extends UnaryFn
      ? [(arg: ReturnType<First>) => ReturnType<Second>, ...Rest]
      : never
      : never
      : never,
      UnaryReturnType<First>
    >
  ]
  : Funcs

/** 管道函数 类型 */
// export type PipeParams<Funcs extends UnaryFn[], SourceT = never, Len = Funcs['length']> =
//   Len extends 0
//     ? []
//     : Funcs extends [infer First extends UnaryFn, infer Second extends UnaryFn, ...infer Rest extends UnaryFn[]]
//       ? [
//         [SourceT] extends [never]
//           ? First
//           : SetFnParams<First, [SourceT]>,

//         ...PipeParams<
//           // [(arg: ReturnType<First>) => ReturnType<Second>, ...Rest],
//           [SetFnParams<Second, [ReturnType<First>]>, ...Rest],
//           ReturnType<First>
//         >
//       ]
//       : Funcs

/**  */
type PipeReturn<Funcs extends UnaryFn[], FirstArg = never,> = Funcs extends [...unknown[], (arg: any) => infer R] ? R : FirstArg

// declare function pipe<Funcs extends UnaryFn[]>(...args: PipeParams<Funcs, number>): PipeReturn<Funcs, number>

// 测试 pipe ---
// declare function num2str(a: number): string
// declare function str2num(a: string): number
// declare function num2boo(a: number): boolean
// declare function boo2num(a: boolean): number

// pipe(num2str, str2num, num2boo, boo2num)
// // @ts-expect-error 'number' not assignable to 'string'

// pipe(str2num, num2boo, boo2num)
// // @ts-expect-error 'boolean' not assignable to 'string'
// pipe(num2boo, str2num, num2boo)
// pipe()



/** 用 New 类型 扩展 Org 类型*/
export type Assign<Org extends ObjectType, New extends ObjectType> = Expand<New & Omit<Org, keyof New>>



/** 可扩展类型 */
export type Extensible<O extends ObjectType> = Expand<O & ObjectType>
