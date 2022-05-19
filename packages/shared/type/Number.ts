import type { Split, ToNumber } from './String'
import type { New as TupleNew, Includes, Shift, Unshift, Join } from './Tuple'
import type { Not, Xor } from './Logical'



/** 判断是否是负数 */
export type IsNeg<N extends number> = `${N}` extends `-${number}` ? true : false



/** 判断是否为正数 */
export type IsPos<N extends number,> = Not<IsNeg<N>>



/** 判断是否为整数 */
export type IsInteger<N extends number> = Not<Includes<Split<`${N}`>, '.'>>





// TODO: 支持bigInt 数字运算
// 正整数加减乘除, 大于小于, 大于等于, 小于等于
/**
 * 两数相加
 * @param N1 数字1
 * @param N2 数字2
 * TODO: 支持负数
 */
// export type Add<N1 extends number, N2 extends number> = [...TupleNew<0, N1>, ...TupleNew<0, N2>]['length']

// 另一种解法: 分离数字和进位并一位一位算，加一减一直到一方为零
// type Add<N1 extends number, N2 extends number> = []
// type TwoNumSum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

/** [num]: [self, -1, +1, sign] */
type NumMap = {
  '-19': [-19, -20, -18, -1],
  '-18': [-18, -19, -17, -1],
  '-17': [-17, -18, -16, -1],
  '-16': [-16, -17, -15, -1],
  '-15': [-15, -16, -14, -1],
  '-14': [-14, -15, -13, -1],
  '-13': [-13, -14, -12, -1],
  '-12': [-12, -13, -11, -1],
  '-11': [-11, -12, -10, -1],
  '-10': [-10, -11, -9, -1],
  '-9': [-9, -10, -8, -1],
  '-8': [-8, -9, -7, -1],
  '-7': [-7, -8, -6, -1],
  '-6': [-6, -7, -5, -1],
  '-5': [-5, -6, -4, -1],
  '-4': [-4, -5, -3, -1],
  '-3': [-3, -4, -2, -1],
  '-2': [-2, -3, -1, -1],
  '-1': [-1, -2, 0, -1],
  '0': [0, -1, 1, 1],
  '1': [1, 0, 2, 1],
  '2': [2, 1, 3, 1],
  '3': [3, 2, 4, 1],
  '4': [4, 3, 5, 1],
  '5': [5, 4, 6, 1],
  '6': [6, 5, 7, 1],
  '7': [7, 6, 8, 1],
  '8': [8, 7, 9, 1],
  '9': [9, 8, 10, 1],
  '10': [10, 9, 11, 1],
  '11': [11, 10, 12, 1],
  '12': [12, 11, 13, 1],
  '13': [13, 12, 14, 1],
  '14': [14, 13, 15, 1],
  '15': [15, 14, 16, 1],
  '16': [16, 15, 17, 1],
  '17': [17, 16, 18, 1],
  '18': [18, 17, 19, 1],
  '19': [19, 18, 20, 1],
}


type NumToArr<T extends number> = Split<`${T}`>
type ArrToNum<T extends (number | string)[]> = ToNumber<Join<T>>
type DecInTen<N extends number> = `${N}` extends keyof NumMap ? NumMap[`${N}`][1] : never
type IncInTen<N extends number> = `${N}` extends keyof NumMap ? NumMap[`${N}`][2] : never

type AddInTen<N1 extends number, N2 extends number> =
  N1 extends 0 ? N2 :
  N2 extends 0 ? N1 :
  IsNeg<N1> extends true
  ? AddInTen<IncInTen<N1>, DecInTen<N2>>
  : IsNeg<N2> extends true
  // 左边为正数，右边为负数 左减右加，其余左加右减
  ? AddInTen<DecInTen<N1>, IncInTen<N2>>
  : AddInTen<IncInTen<N1>, DecInTen<N2>>


// type AddArrs<Arr1 extends string[], Arr2 extends string[], Carry extends string = '0'> =
//   Arr1 extends []
//   ? Carry extends '0'
//   ? Arr2
//   : [...AddArrs<Arr2, [Carry]>]
//   : Arr2 extends []
//   ? ['0']
//   // 均只有一位
//   : [Arr1, Arr2] extends [[infer A1 extends `${infer Num1 extends number}`], [infer A2 extends `${infer Num2 extends number}`]]
//   ? []
//   : []

type _Add<N1 extends number, N2 extends number> = N1




export type Add<N1 extends number, N2 extends number> =
  IsPos<N1> extends true
  // N1 为正数
  ? IsPos<N2> extends true
  // N1, N2 均为正数
  ? _Add<N1, N2>
  // N1为正, N2 为负
  : _Add<N1, N2>
  : IsPos<N2> extends true
  // N1为负, N2为正
  ? _Add<N1, N2>
  // N1, N2 均为负数
  : _Add<N1, N2>


type Sub9<N extends number> =
  N extends 0
  ? [9, 10]
  : [_sub9<NumToArr<N>>]

type _sub9<A extends string[]> =
  {
    [S in keyof A]: A[S] extends keyof NumMap ? AddInTen<9, ToNeg<ToNumber<A[S]>>> : never
  }[number]

type D = ArrToNum<[1, 2, 3, 4]>


type C = Sub9<12>

/** 两数相减 */
// 避免借位 9999 代表减数长度的9
// A > B -> A - B = A + (9999 - B) + 1 - 10000
// A < B -> A - B = -(9999 - (A + (9999 - B)))
export type Sub<N1 extends number, N2 extends number> = []['length']



/** 负数转正数 TODO: 4.8.0 plan */
export type ToPos<N extends number> = `${N}` extends `-${infer P extends number}` ? P : N



/** TODO: 4.8.0 正数转负数 */
export type ToNeg<N extends number> = IsNeg<N> extends true ? N : ToNumber<`-${N}`>



export type Abs<N extends number> = `${N}` extends `-${infer P extends number}` ? P : N



export type SameSign<N1 extends number, N2 extends number> = Xor<IsNeg<N1>, IsNeg<N2>>



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
export type GreatThan<N1 extends number, N2 extends number> = N1 extends N2 ? false : IsPos<Sub<N1, N2>>
// N1 - N2 >= 0
export type GreatEqual<N1 extends number, N2 extends number> = N1 extends N2 ? true : IsPos<Sub<N1, N2>>
// N1 - N2 < 0
export type LessThan<N1 extends number, N2 extends number> = N1 extends N2 ? false : IsNeg<Sub<N1, N2>>
// N1 - N2 <= 0
export type LessEqual<N1 extends number, N2 extends number> = N1 extends N2 ? true : IsPos<Sub<N1, N2>>
// N1 === N2
// export type Equal<N1 extends number, N2 extends number> = N1 extends N2 ? true : false


