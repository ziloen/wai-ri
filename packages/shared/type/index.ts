
/**
 * 参考：https://github.com/millsp/ts-toolbelt
 */


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



type SetValuesTokeyType<T extends Record<keyof any, keyof any | boolean | null | undefined>> = {
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
export type ReverseLoose<T extends Record<keyof any, keyof any | boolean | null | undefined>> = Reverse<SetValuesTokeyType<T>>



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
export type Extension<Org extends ObjectType, New extends ObjectType> = Expand<New & Omit<Org, keyof New>>



/** 可扩展类型 */
export type Extensible<O extends ObjectType> = Expand<O & ObjectType>



type Literal = string | number | bigint | boolean


// TODO: 数字运算
// 正整数加减乘除, 大于小于, 大于等于, 小于等于
namespace Number {
  /** 两数相加 */
  export type Add<N1 extends number, N2 extends number> = [...Union.New<any, N1>, ...Union.New<any, N2>]['length']
  /** 两数相减 */
  export type Sub<N1 extends number, N2 extends number> = []['length']
  // export type GreatThan<N1 extends number, N2 extends number>
  // export
  // export type
}

// TODO: 元组操作
// 首尾元素 Pop, Push, Splice, Join, ToIntersection, At
namespace Union {
  /** 获取长度 */
  export type Length<T extends any[]> = T['length']

  /** 去掉最后一个元素 */
  export type Pop<T extends any[]> = T extends readonly [...infer Rest, any] ? Rest : T

  /** 生成固定长度元组 */
  export type New<T, L extends number, A extends unknown[] = []> = A['length'] extends L ? A : New<T, L, [T, ...A]>

  /** 向最后添加一项 */
  export type Push<U extends any[], T> = [...U, T]

  /** 合并为字符串 */
  export type Join<T extends any[], Devider extends string> =
    T extends [] ? '' :
    // TODO: 使用 4.7 语法重构这两行的T[0]
    T extends [Literal] ? `${T[0]}` :
    T extends [Literal, ...infer Rest] ? `${T[0]}${Devider}${Join<Rest, Devider>}` :
    string
}




// TODO: 字符串操作
// Length, Split, Replace
namespace String {
  /** 字符串长度 */
  export type Length<T extends string> = Union.Length<Split<T, ''>>

  type _Split<Str extends string, Devider extends string, It extends string[] = []> =
    Str extends `${infer StrA}${Devider}${infer StrB}`
    ? _Split<StrB, Devider, [...It, StrA]>
    : [...It, Str]

  /**
   * 字符串分离
   * @param Str 要分离的字符串
   * @param Devider 分隔符
   */
  export type Split<Str extends string, Devider extends string = ''> =
    Devider extends ''
    ? Union.Pop<_Split<Str, Devider>>
    : _Split<Str, Devider>

  /**
   * 用 NewStr 替换 Str 中的 OldStr
   * @param OldStr 需要替换的字符
   * @param NewStr 替换后的字符
   */
  export type Replace<Str extends string, OldStr extends string, NewStr extends string> =
    Str extends `${infer StrA}${OldStr}${infer StrB}`
    ? `${StrA}${NewStr}${Replace<StrB, OldStr, NewStr>}`
    : Str
}



// TODO: 函数
namespace Function {
  /** 函数参数长度 如果有重载会怎么样? */
  export type Length<T extends (...args: any[]) => any> = Union.Length<Parameters<T>>

  /** 设置参数类型 */
  export type SetParams<T, P extends any[]> = T extends (...arg: any[]) => infer R ? (...args: P) => R : never

  /** 设置返回类型 */
  export type SetReturn<T, R> = T extends (...args: infer P) => any ? (...args: P) => R : never

  export type New<Args extends any[] = any[], Return = any> = (...args: Args) => Return
}



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
