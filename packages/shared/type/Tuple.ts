import { Add, IsPos, Sub } from './Number'
import { Literal, Stringable } from './_internal'

// TODO: 元组操作
// 首尾元素 Splice, Join, ToIntersection, At
// namespace Union {

/**
 * 生成固定长度元组
 * @param T 类型
 * @param L 长度
 */
export type New<Item, L extends number, T extends Item[] = []> = T['length'] extends L ? T : New<Item, L, [Item, ...T]>



/** 获取长度 */
export type Length<T extends any[]> = T['length']



export type Typeof<T extends any[]> = T[number]



/** 去掉最后一个元素 */
export type Pop<T extends any[]> = T extends readonly [...infer Rest, any] ? Rest : T



/** 向最后添加一项 */
export type Push<T extends any[], Item> = [...T, Item]



export type Slice<
  T extends any[],
  Start extends number = 0,
  End extends number = never,
  Index extends number = 0
> = Sub<Start, Index>




/**
 * @param T 操作的元组
 * @param DeleteCount 删除数
 * @param Item 添加项
 */
export type Splice<T extends any[], DeleteCount extends number = 0, Item = never> = []



export type Shift<T extends any[]> = T extends [any, ...infer Rest] ? Rest : T



export type Unshift<T extends any[], Item> = [Item, ...T]



export type Reverse<T extends readonly unknown[]> = T extends [...infer Rest, infer Last] ? [Last, ...Reverse<Rest>] : T



export type Includes<T extends any[], P> = P extends Typeof<T> ? true : false



/**
 * 合并为字符串
 * @param T 数组
 * @param Devider 分隔符
 */
export type Join<T extends Literal[], Devider extends string = ''> =
  T extends [] ? '' :
  T extends [infer X extends Literal] ? X :
  T extends [infer F extends Literal, ...infer Rest extends Literal[]] ? `${F}${Devider}${Join<Rest, Devider>}` :
  string



/** TODO: 支持负数 -1 等 */
// export type At<T extends any[], Index extends number, Len extends number = T['length']> = IsPos<Len> extends true ? T[Index] : T[Number.Add<Len, Index>]
export type At<T extends any[], Index extends number, Len extends number = T['length']> = IsPos<Len> extends true ? T[Index] : T[Add<Len, Index>]



/** 最后一个元素 */
export type Last<T extends readonly unknown[]> = T extends [...any, infer L] ? L : never



/** 第一个元素 */
export type First<T extends any[]> = T extends [infer F, ...any] ? F : never






// export type Map<T extends any[]> = []