import type { Fn } from '.'



type _IsUnion<T, U = T> =
  T extends U
    ? [U] extends [T]
      ? false
      : true
    : never

/** 判断是否为联合类型 */
export type IsUnion<T> = _IsUnion<T>



/** T | U -> T & U */
export type ToIntersection<U> = (U extends any ? Fn<[U]> : never) extends Fn<[infer Arg]> ? Arg : never



/** 联合类型最后一个, 顺序不一定是写下的顺序 T | U -> U */
export type Last<T> = ToIntersection<T extends unknown ? Fn<[T]> : never> extends Fn<[infer A]> ? A : never



// export type Has<T, P> = P extends T ? true : false



// export type First



/** 转换为元组，顺序不定 T | U -> [T, U] */
export type ToTuple<U, L = Last<U>> = [U] extends [never] ? [] : [L, ...ToTuple<Exclude<U, L>>]