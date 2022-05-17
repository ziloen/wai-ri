

/** 与 */
export type And<B1 extends boolean, B2 extends boolean> =
  B1 extends false ? false :
  B2 extends false ? false :
  true



/** 或 */
export type Or<B1 extends boolean, B2 extends true> =
  B1 extends true ? true :
  B2 extends true ? true :
  false



/** 非 */
export type Not<T extends boolean> = T extends true ? false : true



/** 异或 */
export type Xor<B1 extends boolean, B2 extends boolean> =
  B1 extends true
  ? B2 extends true ? false : true
  : B2 extends true ? true : false



/** 转化为布尔值 */
export type ToBool<T> =
  [T] extends [never] ? false :
  T extends undefined | null | false | 0 | '' ? false :
  true



/** 相等 */
export type Equal<T1, T2> = T1 extends T2 ? true : false



