


/** 字面量类型 */
export type Literal = string | number | bigint | boolean



/** 忽略的类型 */
export type _ = any


/** 测试用 */
export type Expect<T extends true> = T
export type ExpectTrue<T extends true> = T
export type ExpectFalse<T extends false> = T