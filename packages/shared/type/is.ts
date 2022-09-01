import type { ObjectType } from './index'



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



/**
 * 类型断言
 * - 仅类型修改，无运行时保证
 * - 打包器会清除空函数调用，所以不会有运行时负担
 * - TS限制，一次只能断言一个参数，[多参数断言 issue](https://github.com/microsoft/TypeScript/issues/26916)
 */
export function asType<T>(val: any): asserts val is T { }


/**
 * 非空断言
 * - 仅类型修改，无运行时保证
 * - 空函数调用会被打包器擦除，没有运行时负担
 */
export function asNonNullable<T>(val: T): asserts val is NonNullable<T> { }



/** 是否为数组 */
export const isArray = Array.isArray



/** 判断 key is keyof obj */
export function isKeyof<O extends ObjectType>(obj: O, key: string | number | symbol): key is keyof O {

  // return key in obj

  // 等同于 in 操作符，检查原型链，但不包括不可枚举
  // return Reflect.has(obj, key)

  // 不同于 in 操作符, Object.hasOwn 不检查原型链
  return Object.hasOwn(obj, key)
}



/** 
 * 断言 值不为空，为空抛出错误 
 * @deprecated 带有副作用，手动检查或者使用asType<NonNullable<typeof value>>(value)
 */
export function assertNotNil<T>(val: T): asserts val is NonNullable<T> {
  if (val === null || val === undefined) throw new Error('断言失败')
}