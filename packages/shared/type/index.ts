

export type ObjectType = Record<keyof any, unknown>


/** 任意函数 */
export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return
export type AsyncFn<Args extends any[] = any[], Return = any> = (...args: Args) => Promise<Return>



/** A 数组的元素类型 */
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



type SetValuesTokeyType<T extends Record<keyof any, keyof any | boolean | null | undefined>> = {
  [K in keyof T]: T[K] extends keyof any
    ? T[K]
    : T[K] extends true
      ? 'true'
      : T[K] extends false
        ? 'false'
        : T[K] extends null
          ? 'null'
          : T[K] extends undefined
            ? 'undefined'
            : never
}

/** 反转 对象 值与键 */
export type Reverse<Obj extends Record<keyof Obj, Obj[keyof Obj]>> = { [Val in ValueOf<Obj>]: KeysMatching<Obj, Val> }
export type ReverseLoose<T extends Record<keyof any, keyof any | boolean | null | undefined>> = Reverse<SetValuesTokeyType<T>>



/** 反转 Tuple 顺序 */
export type ReverseTuple<T extends readonly unknown[]> = T extends [...infer Rest, infer Last] ? [Last, ...ReverseTuple<Rest>] : []



/** pipe 函数类型 */
// export type Pipe<T extends ((...args: any) => any) = any, N extends ((...args: any) => any) = any> = [T, N]
// import { flow } from 'lodash-es'
// import { OperatorFunction } from 'rxjs'
// 去除第一个
// type Tail<T extends unknown[]> = T extends [infer F, ...infer L] ? L : []
// Array / Truple 操作
// type Unshift<Arr extends unknown[], T> = [T, ...Arr]
// type Push<Arr extends unknown[], T> = [...Arr, T]
// type Pop<Arr extends unknown[]> = Arr extends [...infer F, infer L] ? F : []
// type Shift<Arr extends unknown[]> = Arr extends [infer F, ...infer L] ? L : []
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
// type Pipe<FirstArg = never, LastArg = never> = FirstArg extends never ? [] : Head<Pipe<FirstArg> extends [(arg: FirstArg) => infer R] ? [(arg: FirstArg) => R] : []> extends FnType<FirstArg, infer Return> ? [FnType<FirstArg, Return>, ...Pipe<Return>] : []

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
    SourceT extends never
    ? First
    : SetFnParams<First, [SourceT]>,

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
//         SourceT extends never
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





/** O 扩展 O 类型 */
export type Extension<O extends ObjectType> = O & ObjectType



/** 是否为 整数 */
export function isInteger(val: unknown): val is number {
  return Number.isInteger(val)
}



/** 是否为 NaN */
export function isNaN(val: unknown): boolean {
  return Number.isNaN(val)
}



/** 是否为 null */
export function isNull(val: unknown): val is null {
  return null === val
}



/** 是否为 boolean */
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}



/** 是否为 nullish */
export function isNil(val: unknown): val is null | undefined {
  return (
    val === undefined ||
    val === null
  )
}



/** 是否为 假值(不包括 0 和 '') */
export function isFalsy(val: unknown): val is (null | undefined | false) {
  return (
    val === undefined ||
    val === null ||
    val === false
  )
}



/** 断言 值不为空，为空抛出错误 */
export function assertNotNil<T>(val: T): asserts val is NonNullable<T> {
  if (val === null || val === undefined)
    throw new Error('断言失败')
}



/** 是否为数组 */
export const isArray = Array.isArray



/** 判断 key is keyof obj */
export function isKeyof<O extends ObjectType>(obj: O, key: string | number | symbol): key is keyof O {
  return key in obj
}
