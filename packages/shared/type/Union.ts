import { Literal } from './_internal'

// TODO: 元组操作
// 首尾元素 Splice, Join, ToIntersection, At
// namespace Union {

/**
 * 生成固定长度元组
 * @param T 类型
 * @param L 长度
 */
export type New<T, L extends number, U extends T[] = []> = U['length'] extends L ? U : New<T, L, [T, ...U]>



/** 获取长度 */
export type Length<U extends any[]> = U['length']



/** 去掉最后一个元素 */
export type Pop<U extends any[]> = U extends readonly [...infer Rest, any] ? Rest : U



/** 向最后添加一项 */
export type Push<U extends any[], T> = [...U, T]



export type Slice<U extends any[], Start extends number = 0, End extends number = never> = []



/**
 * @param U 操作的元组
 * @param DeleteCount 删除数
 * @param Item 添加项
 */
export type Splice<U extends any[], DeleteCount extends number = 0, Item = never> = []



export type Shift<U extends any[]> = U extends [any, ...infer Rest] ? Rest : U



export type Unshift<U extends any[], T> = [T, ...U]



/**
 * 合并为字符串
 * @param T 数组
 * @param Devider 分隔符
 */
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



// export type Map<T extends any[]> = []