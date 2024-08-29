
/**
 * 参考：https://github.com/millsp/ts-toolbelt
 */
export * as Function from './Function'
export * as Logical from './Logical'
export * as Number from './Number'
export * as String from './String'
export * as Tuple from './Tuple'
export * as Union from './Union'



import type { IsUnion, ToTuple } from './Union'
import type { _ } from './_internal'



/** Timeout 类型 */
export type Timeout = ReturnType<typeof setTimeout>



/** 可使用 `${}` 的类型 */
export type Stringable = string | number | bigint | boolean | null | undefined



/** 对象类型，用来取代 object | {} */
export type ObjectType<K extends keyof any = keyof any, V = any> = Record<K, V>



/** 空对象类型 */
declare const emptyObjectSymbol: unique symbol
export interface EmptyObject { [emptyObjectSymbol]?: never }



/** 函数 */
export type Fn<Args extends readonly unknown[] = any[], Return = any> = (...args: Args) => Return



/** 异步函数 */
export type AsyncFn<Args extends readonly unknown[] = any[], Return = any> = (...args: Args) => Promise<Awaited<Return>>



/** 提取重载函数 parameters 和 return，copy 自 https://github.com/microsoft/TypeScript/issues/32164#issuecomment-1146737709 */
type OverloadUnionRecursive<TOverload, TPartialOverload = unknown> = TOverload extends (
  ...args: infer TArgs
) => infer TReturn
  // Prevent infinite recursion by stopping recursion when TPartialOverload
  // has accumulated all of the TOverload signatures.
  ? TPartialOverload extends TOverload
    ? never
    : | OverloadUnionRecursive<
          TPartialOverload & TOverload,
          TPartialOverload & ((...args: TArgs) => TReturn)
    >
    | ((...args: TArgs) => TReturn)
  : never
export type OverloadToUnion<TOverload extends (...args: any[]) => any> = Exclude<
  OverloadUnionRecursive<
// The "() => never" signature must be hoisted to the "front" of the
// intersection, for two reasons: a) because recursion stops when it is
// encountered, and b) it seems to prevent the collapse of subsequent
// "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
// which gives a direct conversion to a union.
(() => never) & TOverload
  >,
  TOverload extends () => never ? never : () => never
>
// Inferring a union of parameter tuples or return types is now possible.
/** 多签名重载函数参数类型 */
export type OverloadParameters<T extends (...args: any[]) => any> = Parameters<OverloadToUnion<T>>
/** 多签名重载函数返回类型 */
export type OverloadReturnType<T extends (...args: any[]) => any> = ReturnType<OverloadToUnion<T>>



/** 数组的元素类型 */
export type ArrayType<A extends any[]> = A[number]



type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

/**
 * 用于提示指定枚举字符串，但是允许 string 类型
 * ```ts
 * type EventName = LiteralUnion<'click' | 'keydown' | 'keyup'>
 * const e: EventName = "mouseup" // 输入时会有提示，且允许任意字符串
 * ```
 */
export type LiteralUnion<T = never, BaseType extends Primitive = string> = T | (BaseType & Record<never, never>)



/**
 * 
 */
export type Awaitable<T> = T | Promise<T>


// https://github.com/microsoft/TypeScript/issues/50933#issuecomment-1258750812
type EnumKeyHelper<E, K extends keyof E, V> = K extends unknown
  ? E[K] extends V
    ? K
    : never
  : never

/**
 * 获取 Enum 的 key 类型
 * @example
 * ```ts
 * enum Enum { A, B, C }
 * type Keys = EnumKeys<typeof Enum, Enum> // "A" | "B" | "C"
 * ```
 */
export type EnumKeys<TypeofEnum, Enum> = EnumKeyHelper<TypeofEnum, keyof TypeofEnum, Enum>

/**
 * 获取 Enum 的 value 类型
 * @example
 * ```ts
 * enum Enum { A = "EA", B = "EB", C = "EC" }
 * type Values = EnumValues<Enum> // "EA" | "EB" | "EC"
 * ```
 */
export type EnumValues<Enum> = Enum extends string ? `${Enum}` : Enum



/**
 * 要么是空对象，要么是指定类型
 *
 * 相比 Partial<T>，只要有一个属性存在，则缩小为T
 * ```ts
 * type T = { a: string, b: number }
 * const partial = {} as Partial<T>
 * const maybe = {} as MaybeEmpty<T>
 *
 * if (partial.a) {
 *   // 只有 partial.a 被缩小为 string, partial.b 仍为 b?: number | undefined
 * }
 *
 * if (maybe.a) {
 *   // maybe 被缩小为 T
 * }
 * ```
 */
export type MaybeEmpty<T> = T | { [K in keyof T]?: undefined }



/** T 类型 L 长度的 Tuple */
// export type FixedArray<T, L extends number, A extends unknown[] = []> = A['length'] extends L ? A : FixedArray<T, L, [T, ...A]>



/** F 异步函数的返回 异步 数据类型 */
export type AwaitedReturn<F extends AsyncFn> = Awaited<ReturnType<F>>



/** O 对象的 value 类型 */
export type ValueOf<O extends Record<keyof any, any>> = O[keyof O]



/** 扩展 为 可以是数组 */
export type Arrayable<T> = T | T[]



/** 变为可写 */
export type Writable<BaseType, Keys extends keyof BaseType = keyof BaseType> = {
  -readonly [Key in Extract<keyof BaseType, Keys>]: BaseType[Key]
} & Omit<BaseType, Keys>

export type Mutable<T, K extends keyof T = keyof T> = Writable<T, K>



/** 根据 value 获取 key 类型 */
export type KeysMatching<Obj, Val> = keyof { [Key in keyof Obj as Obj[Key] extends Val ? Key : never]: _ }



/** 相等 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false



/** 是否为 any */
export type IsAny<T> = 0 extends (1 & T) ? true : false



export type IsArray<T> = T extends readonly unknown[] ? true : false



export type IsAnyOrUnknown<T> = unknown extends T ? true : false



/** 翻转对象键与值 */
export type Flip<Obj extends Record<string, string | number | boolean>> = {
  [Key in keyof Obj as `${Obj[Key]}`]: Key
}

/** 翻转对象键与值 更宽松 */
export type FlipLoose<Obj extends Record<string | number, Stringable>> = {
  [Key in keyof Obj as Obj[Key] extends keyof any ? Obj[Key] : Obj[Key] extends Stringable ? `${Obj[Key]}` : never]: Key extends Stringable ? `${Key}` : never
}



/** 展开对象，仅一层 */
export type Simplify<T> = { [K in keyof T]: T[K] } & Record<never, never>

/** 展开类型 */
export type Expand<T> = ExpandDeep<T, 3>

type StopExpandIfRecursion<T, P, TargetDeep extends number, NextIter extends any[]> =
  Equal<T, P> extends true
    ? P
    : Equal<T[], P> extends true
      ? P
      : ExpandDeep<P, TargetDeep, NextIter>


/** 获取所有可选属性 */
export type OptionalKeysOf<T> = Exclude<{
  [K in keyof T]: T extends Record<K, T[K]>
    ? never
    : K
}[keyof T], undefined>


// //
// type IsRecursion<T> = Exclude<{ [K in keyof T]: Equal<T, T[K]> extends true ? 'true' : Equal<T[], T[K]> extends true ? '1' : '2' }[keyof T], undefined>
// type S = IsRecursion<ChildNode>
// type ChildNode = { id: string, chilren?: ChildNode[] }

// type OO = Equal<ChildNode[] | undefined, ChildNode['chilren']>

// FIXME: type ChildNode = { id: string, chilren?: ChildNode[] } 判断无效
// FIXME: type A = { b: B }; type B = { a: A } 判断无效
/** 递归展开 */
export type ExpandDeep<
  T,
  TargetDeep extends number = 5,
  Iter extends any[] = [],
  Deep extends number = Iter['length'],
  NextIter extends any[] = [...Iter, _]
> =
  // 已到达深度，结束
  Deep extends TargetDeep ? T :
  // 展开函数类型
    T extends (...args: infer Params) => infer Return ? (...args: ExpandDeep<Params, TargetDeep, NextIter>) => StopExpandIfRecursion<T, Return, TargetDeep, NextIter> :
    // 不展开 Promise 类型
      T extends Promise<infer P> ? Equal<T, P> extends true ? T : Promise<ExpandDeep<P, TargetDeep, NextIter>> :
      // 展开对象类型
        T extends object ? { [K in keyof T]: StopExpandIfRecursion<T, T[K], TargetDeep, NextIter> } :
        // 展开联合类型
          IsUnion<T> extends true ? ExpandDeep<ToTuple<T>[number], TargetDeep, NextIter> :
          // 已完全展开，返回
            T



/** 用 New 类型 扩展 Org 类型*/
export type Assign<Org, New> = Simplify<New & Omit<Org, keyof New>>

/** 同 Assign */
export type Merge<Org, New> = Simplify<New & Omit<Org, keyof New>>



/** 可扩展类型，在添加未约束的属性时不会报错 */
export type Extensible<O> = Simplify<O & Record<keyof any, unknown>>


/**
 * 工具，仅供 MergeMutex 与 Mutex 使用
 * @internal
 */
type WithoutKeys<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P] } & { [_ in K]?: never }

/**
 * 合并两对象，并使其互斥
 */
export type MergeMutex<T1, T2> =
  ExpandDeep<
    (T1 | T2) extends object
      ? WithoutKeys<T1, keyof T2> | WithoutKeys<T2, keyof T1>
      : T1 | T2
    , 1
  >


// FIXME: 有BUG，丢失注释信息，且可选变成了必选（丢失了 a?: string 的 ?）
/** 使两属性互斥，不是线程互斥锁，Disjoint / Mutex / MutuallyExclusive */
export type Mutex<T, K1 extends keyof T, K2 extends keyof T> =
  ExpandDeep<
    | WithoutKeys<T, K1>
    | WithoutKeys<T, K2>
    , 1
  >
// { [K in Exclude<keyof T, K1 | K2>]: T[K] } &
// (
//   | { [K in K1]?: never } & { [K in K2]: T[K] }
//   | { [K in K2]?: never } & { [K in K1]: T[K] }
// )
// | ({ [P in Exclude<K, K1>]: T[P] } & { [P in K1]?: never })
// | ({ [P in Exclude<K, K2>]: T[P] } & { [P in K2]?: never })



/** 选择哪些属性为可选 */
export type PartialByKey<T, K extends keyof T> = Simplify<{ [P in K]?: T[P] } & Omit<T, K>>

export type SetOptional<T, K extends keyof T> = PartialByKey<T, K>



/** 选择哪些属性为必选 */
export type RequiredByKey<T, K extends keyof T> = Simplify<{ [P in K]-?: T[P] } & Omit<T, K>>

export type SetRequired<T, K extends keyof T> = RequiredByKey<T, K>



/**
 * 将 Union 的类型合并
 * ```ts
 * type A = { a?: string }
 * type B = { a: number, b: string }
 *
 * type C = MergeUnion<A | B>
 * type C = {
 *   a: string | number | undefined,
 *   b: string
 * }
 * ```
 */
export type MergeUnion<T> = {
  [K in (T extends infer P ? keyof P : never)]:
  T extends infer P
    ? K extends keyof P
      ? P[K]
      : never
    : never
}



/**
 * 联合类型的所有 key
 * ```ts
 * type A = { a: string, c: boolean }
 * type B = { b: number }
 * type Keys = KeyofUnion<A | B>
 * type Keys = "a" | "b" | "c"
 * ```
 */
export type KeyofUnion<T> = T extends infer R ? keyof R : never



/**
 * 使用可选 never 填充联合类型
 * ```ts
 * type A = { a: string, c: boolean };
 * type B = { b: number };
 *
 * type C = PaddingUnion<A | B>
 * type C = {
 *   a: string
 *   c: boolean
 *   b?: undefined
 * } | {
 *   a?: undefined
 *   c?: undefined
 *   b: number
 * }
 * ```
 */
export type PadUnion<T, K extends keyof any = KeyofUnion<T>> =
  T extends infer R
    ? R & { [P in Exclude<K, keyof R>]?: never }
    : never



/**
 * 从联合类型中挑选出有 K 键值的项
 * ```ts
 * type A = { a: _ } | { b: _ } | { c: _ }
 *
 * type B = ExtractByKey<A, 'a' | 'b'>
 * type B = { a: _ } | { b: _ }
 * ```
 */
export type ExtractByKey<T, K extends keyof any> =
  T extends infer R
    ? K extends keyof R
      ? R
      : never
    : never