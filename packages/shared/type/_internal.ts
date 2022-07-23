


/** 字面量类型 */
export type Literal = string | number | bigint | boolean



/** 可使用 `${}` 的类型 */
export type Stringable = string | number | bigint | boolean | null | undefined



/** 忽略的类型 */
export type _ = any



type GetArrFromNumMap = {
  0: []
  1: [...GetArrFromNumMap[0], 1]
  2: [...GetArrFromNumMap[1], 1]
  3: [...GetArrFromNumMap[2], 1]
  4: [...GetArrFromNumMap[3], 1]
  5: [...GetArrFromNumMap[4], 1]
  6: [...GetArrFromNumMap[5], 1]
  7: [...GetArrFromNumMap[6], 1]
  8: [...GetArrFromNumMap[7], 1]
  9: [...GetArrFromNumMap[8], 1]
  10: [...GetArrFromNumMap[9], 1]
  11: [...GetArrFromNumMap[10], 1]
  12: [...GetArrFromNumMap[11], 1]
  13: [...GetArrFromNumMap[12], 1]
  14: [...GetArrFromNumMap[13], 1]
  15: [...GetArrFromNumMap[14], 1]
  16: [...GetArrFromNumMap[15], 1]
  17: [...GetArrFromNumMap[16], 1]
  18: [...GetArrFromNumMap[17], 1]
  19: [...GetArrFromNumMap[18], 1]
}

// 数字转换为数组
type GetArrFromNum<T extends number> =
  T extends keyof GetArrFromNumMap ? GetArrFromNumMap[T] : []

// 字符串分割为数组
type StrToArr<
  S extends string,
  V extends any[] = []
> = S extends `${infer K}${infer R}` ? StrToArr<R, [...V, K]> : V

type Length<T, D extends number = 0> =
  T extends any[]
    ? T["length"]
    : T extends string
      ? StrToArr<T>["length"]
      : D

// 字符串转数字
type StrToNum<T extends string> = T extends `${infer N extends number}` ? N : never


type Plus<
  T,
  K,
  TI extends number = T extends number ? T : 0,
  KI extends number = K extends number ? K : 0,
  R = T extends 0
    ? K
    : K extends 0
      ? T
      : Length<[...GetArrFromNum<TI>, ...GetArrFromNum<KI>]>
> = R extends number ? R : 0


// 转换为联合类型去判断
type NumToUnion<
  T extends number,
  S extends any[] = []
> = S["length"] extends T ? T : S["length"] | NumToUnion<T, [...S, _]>


// 长度不同  ，依次比较
type GetMaxFromLength<
  T extends string,
  S extends string,
  I extends any[] = [_],
  TI extends number = StrToNum<CharAt<T, I["length"]>>,
  SI extends number = StrToNum<CharAt<S, I["length"]>>
> =
  T extends S
    ? T
    : true extends isGreater<TI, SI>
      ? T
      : TI extends SI
        ? GetMaxFromLength<T, S, [...I, _]>
        : S

// 比较0-9的数字的大小
type GetMaxInSingleNum<
  T extends number,
  S extends number
> = NumToUnion<T> extends NumToUnion<S> ? S : T

type isGreater<T extends number, S extends number> =
  T extends S
    ? false
    : T extends GetMaxInSingleNum<T, S>
      ? true
      : false


// type IsEqual
// 长度相同,依次比较，长度不同，比较数字对应的字符串的长度


type Max<
  T extends string,
  S extends string,
  TL extends number = Length<`${T}`>,
  SL extends number = Length<`${S}`>
> = T extends S
  ? T
  : TL extends SL
    ? GetMaxFromLength<T, S>
    : TL extends GetMaxInSingleNum<TL, SL>
      ? T
      : S


// 找到指定位置的字符串
type CharAt<
  T extends string,
  V extends number,
  I extends any[] = [1]
> = I["length"] extends V
  ? T extends `${infer R}${infer S}`
    ? R
    : ""
  : T extends `${infer R}${infer S}`
    ? CharAt<S, V, [...I, 1]>
    : never


type Pop<T extends readonly unknown[]> = T extends [_, ...infer R] ? R : []
type PaddLeft<T extends string, L extends number> =
  Length<T> extends L
    ? T
    : PaddLeft<`0${T}`, L>


type DeletePre<
  T extends string,
  S extends string
> = T extends `${S}${infer R}` ? DeletePre<R, S> : T


type ReduceTool<
  T extends any[],
  S extends any[],
  Pre extends string = ""
> = T extends [...S, ...infer R] ? `${Pre}${R["length"]}` : `0`


type ReduceSingleString<
  T extends string,
  S extends string,
  TN extends number = StrToNum<T>,
  SN extends number = StrToNum<S>,
  M = Max<T, S>
> = T extends M
  ? ReduceTool<GetArrFromNum<TN>, GetArrFromNum<SN>>
  : ReduceTool<GetArrFromNum<SN>, GetArrFromNum<TN>, "-">


type ReduceFn<
  T extends string,
  S extends string,
  L extends number = Length<T>, //计算较大的长度
  A extends any[] = GetArrFromNum<L>, //根据长度转换为数组，用于记录需要累减几次
  R extends string = "", //之前累加的结果
  P extends number = 0, //前一位的差是否小于0
  I extends number = A["length"], //当前累加到第几位
  TI extends number = StrToNum<CharAt<T, I>>, //T第i位的字符串
  SI extends number = StrToNum<CharAt<S, I>>, //S第i位的字符串
  IsMax extends boolean = `${TI}` extends Max<`${TI}`, `${Plus<P, SI>}`>
  ? true
  : false,
  C extends string = IsMax extends true
    ? ReduceSingleString<`${TI}`, `${Plus<P, SI>}`>
    : ReduceSingleString<`${Plus<TI, 10>}`, `${Plus<P, SI>}`> // 当前轮的计算结果
> = I extends 0
    ? R
    : IsMax extends true
      ? ReduceFn<T, S, L, Pop<A>, `${C}${R}`, 0>
      : ReduceFn<T, S, L, Pop<A>, `${C}${R}`, 1>


type ReduceHelper<
  T extends string,
  S extends string,
  Pre extends string = "",
  L extends number = Length<T>,
  TP extends string = PaddLeft<T, L>,
  SP extends string = PaddLeft<S, L>,
  R extends string = DeletePre<ReduceFn<TP, SP, L>, "0">
> = R extends "" ? `${Pre}0` : `${Pre}${R}`


type Reduce<T extends string, S extends string> = T extends Max<T, S>
  ? ReduceHelper<T, S>
  : ReduceHelper<S, T, "-">


type Sub<T extends number, S extends number> = StrToNum<Reduce<`${T}`, `${S}`>>

type N = Sub<99999, 2>