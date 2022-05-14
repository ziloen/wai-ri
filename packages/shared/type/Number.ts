import type { Split } from './String'
import type { New as TupleNew, Includes } from './Tuple'
import type { Not } from './Logical'


// TODO: 支持bigInt 数字运算
// 正整数加减乘除, 大于小于, 大于等于, 小于等于
/**
 * 两数相加
 * @param N1 数字1
 * @param N2 数字2
 * TODO: 支持负数
 */
export type Add<N1 extends number, N2 extends number> = [...TupleNew<0, N1>, ...TupleNew<0, N2>]['length']

// 另一种解法: 分离数字和进位并一位一位算，加一减一直到一方为零
// type Add<N1 extends number, N2 extends number> = []
// type TwoNumSum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
// type NumToArr<T extends number> = String.Split<`${T}`>
// type Inc<N extends number> = Shift<TwoNumSum>[N]
// type Dec<N extends number> = Unshift<TwoNumSum, -1>[N]
// type AddInTen<N1 extends number, N2 extends number> =
//   N1 extends 0 ? N2 :
//   N2 extends 0 ? N1 :
//   AddInTen<Inc<N1>, Dec<N2>>

// type AddArrs<Arr1 extends string[], Arr2 extends string[], Carry extends string = '0'> =
//   Arr1 extends []
//     ? Carry extends '0'
//       ? Arr2
//       : [...AddArrs<Arr2, [Carry]>]
//     : Arr2 extends []
//       ? ['0']
//       // 均只有一位
//       : [Arr1, Arr2] extends [[infer A1], [infer A2]]
//         ?

// type Add<N1 extends number, N2 extends number> =




/** 两数相减 */
export type Sub<N1 extends number, N2 extends number> = []['length']



/** 判断是否是负数 */
export type IsNeg<N extends number> = `${N}` extends `-${number}` ? true : false



/** 判断是否为正数 */
export type IsPos<N extends number,> = Not<IsNeg<N>>



/** 判断是否为正数 */
export type IsInteger<N extends number> = Not<Includes<Split<`${N}`>, '.'>>



/** 负数转正数 TODO: 4.8.0 plan */
// export type ToPos<N extends number> = `${N}` extends `-${infer P extends number}` ? P : N



/** TODO: 4.8.0 正数转负数 */
export type ToNeg<N extends number> = IsNeg<N> extends true ? N : `-${N}`



/** 基数 2-36 */
type Radix = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16

/** TODO: 支持指定基数  */
export type ToString<N extends number, radix extends Radix> = `${N}`



// type nums = [
//   -100,
//   -99,
//   -98,
//   -97
// ]

// type NewNum<L extends number, A extends unknown[] = [], LL = A['length']> = A["length"] extends L ? A : NewNum<L, [LL, ...A]>


// type Is<N1 extends number, N2 extends number> = N1 extends N2 ? true : false

// N1 - N2 > 0
// export type GreatThan<N1 extends number, N2 extends number> = IsPos<Sub<N1, N2>>
// N1 - N2 >= 0
// export type GreatEqual<N1 extends number, N2 extends number> = N1 extends N2 ? true : IsPos<Sub<N1, N2>>
// N1 - N2 < 0
// export type LessThan<N1 extends number, N2 extends number> = IsNeg<Sub<N1, N2>>
// N1 - N2 <= 0
// export type LessEqual<N1 extends number, N2 extends number> = N1 extends N2 ? true : IsPos<Sub<N1, N2>>
// N1 === N2
// export type Equal<N1 extends number, N2 extends number> = N1 extends N2 ? true : false


