import { Fn } from '.'
import { Includes } from './Tuple'



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



export type Last<T> = ToIntersection<T extends unknown ? Fn<[T]> : never> extends Fn<[infer A]> ? A : never



// export type Has<T, P> = P extends T ? true : false



// export type First



/** T | U -> [T, U] */
export type ToTuple<U, L = Last<U>> = [U] extends [never] ? [] : [L, ...ToTuple<Exclude<U, L>>]