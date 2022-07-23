import type { GreatThan, IsPos, LessThan } from './Number'



/** 寻找最大值 */
export type Max<N extends number[], Result extends N[0]> =
  N extends []
    ? Result
    : N extends [infer F extends number, ...infer Rest extends number[]]
      ? Max<Rest, GreatThan<F, Result> extends true ? F : Result>
      : never



/** 寻找最小值 */
export type Min<N extends number[], Result extends number = N[0]> =
  N extends []
    ? Result
    : N extends [infer F extends number, ...infer Rest extends number[]]
      ? Min<Rest, LessThan<F, Result> extends true ? F : Result>
      : never



export type Floor<N extends number> = N



export type Round<N extends number> = N



export type Sign<N extends number> = N extends 0 ? 0 : IsPos<N> extends true ? 1 : -1