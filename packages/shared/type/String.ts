import type { Stringable } from '.'
import type { _ } from './_internal'



/**
 * 分离字符串
 * @param Str 要分离的字符串
 * @param Devider 分隔符
 */
export type Split<
  Str extends string,
  Separator extends string = '',
  Result extends string[] = []
> =
  Str extends `${infer First}${Separator}${infer Rest}`
    ? Split<Rest, Separator, [...Result, First]>
    : [...Result, ...(Str extends '' ? [] : [Str])]



/**
 * 用 NewStr 替换 Str 中的 OldStr
 * @param Old 需要替换的字符
 * @param New 替换后的字符
 */
export type ReplaceAll<
  Str extends string,
  Old extends string,
  New extends string
> =
  Str extends `${infer A}${Old}${infer B}`
    ? `${A}${New}${ReplaceAll<B, Old, New>}`
    : Str



/** 转换为数字类型，TS 4.8+ */
export type ToNumber<NumStr> =
  NumStr extends Stringable
    ? `${NumStr}` extends `.${infer N extends number}`
      ? ToNumber<`0.${N}`>
      : `${NumStr}` extends `${infer N extends number}.`
        ? N
        : `${NumStr}` extends `00${infer N}`
          ? ToNumber<N>
          : `${NumStr}` extends `${infer B}.${infer A}0`
            ? ToNumber<`${B}.${A}`>
            : `${NumStr}` extends `${infer N extends number}`
              ? N
              : never
    : never



/** 获取字符串指定位置的字符 */
export type CharAt<
  Str extends string,
  Index extends number = 0,
  Iter extends any[] = [],
  CurrentIndex extends number = Iter['length'],
  NextIter extends any[] = [...Iter, _]
> =
  CurrentIndex extends Index
    ? Str extends `${infer Result}${_}`
      ? Result
      : ''
    : Str extends `${_}${infer Rest}`
      ? CharAt<Rest, Index, NextIter>
      : never



/** 转换为字符串类型 */
export type ToString<T> = T extends Stringable ? `${T}` : ''



/** 去除左边空白 */
export type TrimLeft<S extends string> = S extends ` ${infer R}` ? TrimLeft<R> : S

/** 去除右边空白 */
export type TrimRight<S extends string> = S extends `${infer R} ` ? TrimRight<R> : S

/** 去除左右空白 */
export type Trim<S extends string> = TrimLeft<TrimRight<S>>