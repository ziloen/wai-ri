import type { Add, IsPos } from './Number'
import type { Split } from './String'
import type { Literal, _ } from './_internal'



/**
 * 生成固定长度元组
 * @param T 类型
 * @param L 长度
 */
export type New<Item, L extends number, T extends Item[] = []> = T['length'] extends L ? T : New<Item, L, [Item, ...T]>



/** 获取长度 */
export type Length<T extends any[] | string | number> =
  T extends any[] ? T['length'] :
  T extends string ? Split<T>['length'] :
  T extends number ? Split<`${T}`>['length'] :
  never



/** 所以元素类型 [1, 2] -> 1 | 2 */
export type Typeof<T extends any[]> = T[number]



/** 去掉最后一个元素 */
export type Pop<T extends any[]> = T extends readonly [...infer Rest, _] ? Rest : T



/** 向最后添加一项 */
export type Push<T extends any[], Item> = [...T, Item]



/** 去除第一个元素 */
export type Shift<T extends readonly unknown[]> = T extends [_, ...infer Rest] ? Rest : T



/** 向数组第一个插入元素 */
export type Unshift<T extends readonly unknown[], Item> = [Item, ...T]



// TODO:
export type Slice<
  T extends any[],
  Start extends number = 0,
  End extends number = never,
  Index extends number = 0
> = T
// Sub<Start, Index>



/**
 * @todo TODO:
 * @param T 操作的元组
 * @param DeleteCount 删除数
 * @param Item 添加项
 */
export type Splice<
  T extends any[],
  DeleteCount extends number = 0,
  Item extends any[] = [],
  Len extends number = T['length'],
  IndexArr extends any[] = [],
  Index extends number = IndexArr['length']
> = T
// Index extends Len
//   ? [...T, ...Item]
//   : Splice<Shift<T>, >



/** 反转整个数组 */
export type Reverse<T extends readonly unknown[]> = T extends [...infer Rest, infer Last extends T[number]] ? [Last, ...Reverse<Rest>] : T



/** 是否包含元素 */
export type Includes<T extends readonly unknown[], Ele> = Ele extends T[number] ? true : false



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
export type At<T extends any[], Index extends number, Len extends number = T['length']> = IsPos<Index> extends true ? T[Index] : T[Add<Len, Index>]



/** 最后一个元素 */
export type Last<T extends readonly unknown[]> = T extends [..._, infer L extends T[number]] ? L : never



/** 第一个元素 */
export type First<T extends readonly unknown[]> = T extends [infer F extends T[number], ..._] ? F : never



/** 转交集 */
export type ToIntersection<T extends readonly unknown[], Result = unknown> = T extends [] ? Result : Result & ToIntersection<Shift<T>, T[0]>



/** TODO: 排序 */
export type Sort<N extends number[]> = N



/** 是否是元组类型，如 [number] ，数组类型如 number[] 会返回 false */
export type IsTuple<T> =
  [T] extends [never] ? false :
  T extends any[]
    ? number extends T['length']
      ? false
      : true
    : false



// export type Map<T extends any[]> = []
