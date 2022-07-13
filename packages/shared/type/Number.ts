import type { Length, Split, ToNumber, CharAt } from './String'
import type { New as TupleNew, Includes, Shift, Unshift, Join, Pop, Last, Push } from './Tuple'
import type { Not, Xor } from './Logical'
import { Literal } from './_internal'
import { Equal } from '.'



/** 判断是否是负数 */
export type IsNeg<N extends number> = `${N}` extends `-${number}` ? true : false



/** 判断是否为正数 */
export type IsPos<N extends number,> =
  `${N}` extends `-${number}`
    ? false
    : N extends 0
      ? false
      : true



/** 判断是否为整数 */
export type IsInteger<N extends number> = Not<Includes<Split<`${N}`>, '.'>>



/** 不能是 number 或者 NaN */
type MustLiteral<N extends number> = `${N}` extends `${infer T extends number}` ? number extends T ? never : N : never

/**
 * @example
 * function add<N extends number>(a: CheckNaN<N>) {
 *   return a
 * }
 * // 会误伤 number 类型
*/
export type CheckNaN<N extends number, Msg = "可能为NaN"> = [MustLiteral<N>] extends [never] ? Msg : N



export type CheckNegative<T extends number, Msg = "不能使用负数"> = `${T}` extends `-${number}` ? Msg : T



// TODO: 支持bigInt 数字运算
// 正整数加减乘除, 大于小于, 大于等于, 小于等于
/**
 * 两数相加
 * @param N1 数字1
 * @param N2 数字2
 * TODO: 支持负数
 */

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


type SubInTen<N1 extends number, N2 extends number> =
  N1 extends N2 ? 0 :
  UnsignGreat<N1, N2> extends true
    ? N2 extends 0
      ? N1
      : SubInTen<DecInTen<N1>, DecInTen<N2>>
    : SubInTen<N2, N1>



// 当前位，进位
type HalfAddMap = {
  '0': [0, 0],
  '1': [1, 0],
  '2': [2, 0],
  '3': [3, 0],
  '4': [4, 0],
  '5': [5, 0],
  '6': [6, 0],
  '7': [7, 0],
  '8': [8, 0],
  '9': [9, 0],
  '10': [0, 1]
  '11': [1, 1],
  '12': [2, 1],
  '13': [3, 1],
  '14': [4, 1],
  '15': [5, 1],
  '16': [6, 1],
  '17': [7, 1],
  '18': [8, 1],
  '19': [9, 1],
}




// 半加器
type HalfAdder<N1 extends number, N2 extends number> =
  `${AddInTen<N1, N2>}` extends `${infer K extends number}`
  ? `${K}` extends keyof HalfAddMap
  ? HalfAddMap[`${K}`]
  : never
  : never


// 全加器
type FullAdder<N1 extends string[], N2 extends string[], Carry extends number = 0, Result extends string = ''> =
  N1 extends []
    ? N2 extends []
      ? Carry extends 0
        ? Result
        : `${1}${Result}`
      : Carry extends 0
        ? `${Join<N2>}${Result}`
        : FullAdder<['1'], N2, 0, Result>
    : N2 extends []
      ? Carry extends 0
        ? `${Join<N1>}${Result}`
        : FullAdder<['1'], N1, 0, Result>
      : HalfAdder<AddInTen<ToNumber<Last<N1>>, Carry>, ToNumber<Last<N2>>> extends [infer N extends number, infer C extends number]
        ? FullAdder<Pop<N1>, Pop<N2>, C, `${N}${Result}`>
        : never


type _Add<N1 extends number, N2 extends number> = ToNumber<FullAdder<NumToArr<N1>, NumToArr<N2>>>


// 两数相加 TODO: 支持负数，小数 TS 4.8+
export type Add<N1 extends number, N2 extends number> =
  IsPos<N1> extends true
    // N1 为正数
    ? IsPos<N2> extends true
      // N1, N2 均为正数
      ? _Add<N1, N2>
      // N1为正, N2 为负
      : Sub<N1, Abs<N2>>
    : IsPos<N2> extends true
      // N1为负, N2为正
      ? Sub<N2, Abs<N1>>
      // N1, N2 均为负数
      : ToNeg<_Add<Abs<N1>, Abs<N2>>>



type NumToUnion<N extends number, T extends any[] = []> =
  T['length'] extends N
    ? N
    : T['length'] | NumToUnion<N, [...T, 0]>


type GreatByUnion<
  N1 extends number,
  N2 extends number
> = NumToUnion<N1> extends NumToUnion<N2> ? false : true



type GreatByString<
  N1 extends number,
  N2 extends number,
  IndexArr extends any[] = [],
  I extends number = IndexArr['length'],
  N1_I extends number = ToNumber<CharAt<`${N1}`, I>>,
  N2_I extends number = ToNumber<CharAt<`${N2}`, I>>
> =
  N1_I extends never
    ? false
    : N1_I extends N2_I
      ? GreatByString<N1, N2, [...IndexArr, ]>
      : GreatByUnion<N1_I, N2_I>



type UnsignGreat<
  N1 extends number,
  N2 extends number,
  L1 extends number = Length<`${N1}`>,
  L2 extends number = Length<`${N2}`>,
> =
  N1 extends N2
    ? false
    : L1 extends L2
      ? GreatByString<N1, N2>
      : GreatByUnion<L1, L2> extends true
        ? true
        : false


type MinusByNine<
  N extends number,
  Result extends number[] = [],
  IndexArr extends any[] = [],
  I extends number = IndexArr['length'],
  N_I extends number = ToNumber<CharAt<`${N}`, I>>,
  Len = Length<`${N}`>
> =
  I extends Len
    ? ToNumber<Join<Result>>
    : MinusByNine<N, Push<Result, SubInTen<9, N_I>>, [...IndexArr, 0]>

type Q = ToNumber<'1.'>

/** 两数相减 */
// 避免借位 9999 代表减数长度的 9, 即 Tuple.New<'9', Length<Split<`${A}`>>>
// A > B ->
//   A - B = A + (9999 - B) + 1 - 10000
// A < B ->
//   A - B = -(9999 - (A + (9999 - B)))
export type Sub<N1 extends number, N2 extends number> =
  Equal<N1, N2> extends true ? 0 :
  IsNeg<N1> extends true
    ? IsNeg<N2> extends true
      ? Sub<Abs<N2>, Abs<N1>>
      : ToNeg<_Add<Abs<N1>, N2>>
    : IsNeg<N2> extends true
      ? _Add<N1, Abs<N2>>
      // 两数皆为正数了
      : UnsignGreat<N1, N2> extends true
        // N1 > N2
        ? Add<N1, N2>
        // N1 < N2
        : ToNeg<Add<N1, N2>>




/** 负数转正数, TS 4.8+ */
export type ToPos<N extends number> = `${N}` extends `-${infer P extends number}` ? P : N



/** 正数转负数, TS 4.8+  */
export type ToNeg<N extends number> = IsNeg<N> extends true ? N : ToNumber<`-${N}`>



/** 绝对值 */
export type Abs<N extends number> = `${N}` extends `-${infer P extends number}` ? P : N



export type SameSign<N1 extends number, N2 extends number> = Xor<IsNeg<N1>, IsNeg<N2>>



/** 基数 2-36 */
type Radix = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16

/** TODO: 支持指定基数  */
export type ToString<N extends number, radix extends Radix> = `${N}`





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


