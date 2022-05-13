import { Literal } from './_internal'

// TODO: 元组操作
// 首尾元素 Pop, Push, Splice, Join, ToIntersection, At
// namespace Union {

/**
 * 生成固定长度元组
 * @param T 类型
 * @param L 长度
 */
export type New<T, L extends number, A extends unknown[] = []> = A['length'] extends L ? A : New<T, L, [T, ...A]>



/** 获取长度 */
export type Length<T extends any[]> = T['length']



/** 去掉最后一个元素 */
export type Pop<T extends any[]> = T extends readonly [...infer Rest, any] ? Rest : T



/** 向最后添加一项 */
export type Push<U extends any[], T> = [...U, T]



/** 合并为字符串 */
export type Join<T extends any[], Devider extends string> =
  T extends [] ? '' :
  // TODO: 使用 4.7 语法重构这两行的T[0]
  T extends [Literal] ? `${T[0]}` :
  T extends [Literal, ...infer Rest] ? `${T[0]}${Devider}${Join<Rest, Devider>}` :
  string



/** TODO: 支持负数 -1 等 */
export type At<T extends any[], L extends number, Len = T['length']> = T[L]



/** 最后一个元素 */
export type Last<T extends any[]> = T extends [...any, infer L] ? L : never



/** 第一个元素 */
export type First<T extends any[]> = T extends [infer F, ...any] ? F : never