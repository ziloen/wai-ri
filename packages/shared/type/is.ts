import type { ExtractByKey, KeyofUnion, ObjectType } from './index'



/** 是否为 整数 */
/* #__NO_SIDE_EFFECTS__ */
export function isInteger(val: unknown): val is number {
  return Number.isInteger(val)
}



/** 是否为 NaN */
/* #__NO_SIDE_EFFECTS__ */
export function isNaN(val: unknown) {
  return Number.isNaN(val)
}



/** 是否为 Object */
/* #__NO_SIDE_EFFECTS__ */
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}



/**
 * 是否为函数
 *
 * 用于解决 `typeof val === 'function'` 类型不收窄问题
 * @example
 * ```ts
 * const getter: number | (() => number) = 1
 * const value = isFn(getter) ? getter() : getter
 * ```
 */
/* #__NO_SIDE_EFFECTS__ */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFn(val: unknown): val is Function {
  return typeof val === 'function'
}



/** 是否为 null */
/* #__NO_SIDE_EFFECTS__ */
export function isNull(val: unknown): val is null {
  return null === val
}



/** 是否为 boolean */
/* #__NO_SIDE_EFFECTS__ */
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}



/** 是否为 nullish */
/* #__NO_SIDE_EFFECTS__ */
export function isNil(val: unknown): val is null | undefined {
  return (
    val === undefined ||
    val === null
  )
}



/** 是否为 假值 (不包括 0 和 '') */
/* #__NO_SIDE_EFFECTS__ */
export function isFalsy(val: unknown): val is null | undefined | false {
  return (
    val === undefined ||
    val === null ||
    val === false
  )
}



/**
 * Return `true` if the given `val` is a primitive type. Otherwise return `false`.
 */
export function isPrimitive(val: unknown): val is string | number | boolean | symbol | bigint | null | undefined {
  return (
    (typeof val !== 'object' && typeof val !== 'function') ||
    val === null
  )
}



/**
 * 类型断言
 * - 仅类型修改，无运行时保证
 * - TS限制，一次只能断言一个参数，[多参数断言](https://github.com/microsoft/TypeScript/issues/26916)
 */
/* #__NO_SIDE_EFFECTS__ */
export function asType<T>(val: any): asserts val is T { }


/**
 * 非空断言
 * - 仅类型修改，无运行时保证
 */
/* #__NO_SIDE_EFFECTS__ */
export function asNonNullable<T>(val: T): asserts val is NonNullable<T> { }



/** 判断 key is keyof obj */
/* #__NO_SIDE_EFFECTS__ */
export function isKeyof<O extends ObjectType, K extends keyof any>(obj: O, key: K): obj is ExtractByKey<O, K> {
  return Object.hasOwn(obj, key)
}