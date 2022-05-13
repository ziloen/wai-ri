import type * as Union from './Union'


// TODO: 数字运算
// 正整数加减乘除, 大于小于, 大于等于, 小于等于
// namespace Number {
/** 两数相加 */
export type Add<N1 extends number, N2 extends number> = [...Union.New<any, N1>, ...Union.New<any, N2>]['length']
/** 两数相减 */
export type Sub<N1 extends number, N2 extends number> = []['length']
  // export type GreatThan<N1 extends number, N2 extends number>
  // export
  // export type
// }


