import { Fn } from '.'


type _IsUnion<T, U = T> = T extends U ? [U] extends [T] ? false : true : never

/** 判断是否为联合类型 */
export type IsUnion<T> = _IsUnion<T>



export type ToIntersection<U> = (U extends any ? Fn<[U]> : never) extends Fn<[infer Arg]> ? Arg : never



export type Last<T> = ToIntersection<T extends unknown ? Fn<[T]> : never> extends Fn<[infer A]> ? A : never


// export type First

export type ToTuple<U, L = Last<U>> = [U] extends [never] ? [] : [L, ...ToTuple<Exclude<U, L>>]