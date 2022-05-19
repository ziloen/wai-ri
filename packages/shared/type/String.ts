import type { Literal } from './_internal'
import type { Length as TupleLen, Pop } from './Tuple'
import type { } from './Number'



/** 字符串长度 */
export type Length<T extends string> = TupleLen<Split<T, ''>>



type _Split<Str extends string, Devider extends string, It extends string[] = []> =
  Str extends `${infer StrA}${Devider}${infer StrB}`
  ? _Split<StrB, Devider, [...It, StrA]>
  : [...It, Str]

/**
 * 分离字符串
 * @param Str 要分离的字符串
 * @param Devider 分隔符
 */
export type Split<Str extends string, Devider extends string = ''> =
  Devider extends ''
  ? Pop<_Split<Str, Devider>>
  : _Split<Str, Devider>



/**
 * 用 NewStr 替换 Str 中的 OldStr
 * @param OldStr 需要替换的字符
 * @param NewStr 替换后的字符
 */
export type Replace<Str extends string, OldStr extends string, NewStr extends string> =
  Str extends `${infer StrA}${OldStr}${infer StrB}`
  ? `${StrA}${NewStr}${Replace<StrB, OldStr, NewStr>}`
  : Str





// TODO: 4.8.0
export type ToNumber<NumStr extends string | number> = `${NumStr}` extends `${infer N extends number}` ? N : never



export type ToString<T> = T extends number | string | bigint | boolean | undefined | null ? `${T}` : string