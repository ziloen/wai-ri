


/** 
 * 字面量类型
 * @internal
 */
export type Literal = string | number | bigint | boolean



/** 
 * @internal
 */
export type _ = any


/** 
 * 测试用
 * @internal
 */
export type Expect<T extends true> = T
/** @internal */
export type ExpectTrue<T extends true> = T
/** @internal */
export type ExpectFalse<T extends false> = T