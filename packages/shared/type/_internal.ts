import { SetParams, UnaryFn } from './Function'
import { Split, ToNumber } from './String'
import { Join, Last, Length, Pop } from './Tuple'



export type Literal = string | number | bigint | boolean

export type Stringable = string | number | bigint | boolean | null | undefined

// class Obs<T> {

// }

// type O<T> = Obs<T>

// type Fn<T = any, R = any> = UnaryFn<O<T>, O<R>>
// type SP<T, P> = T extends Fn<any, infer R> ? Fn<P, R> : never
// type GR<T> = T extends Fn<any, infer R> ? R : never

// type PipeParams<Funcs extends Fn[], SourceT = never, Len = Funcs['length']> =
//   Len extends 0
//   ? []
//   : Funcs extends [infer First extends Fn, infer Second extends Fn, ...infer Rest extends Fn[]]
//   ? [
//     // [SourceT] extends [never] ? First :
//     SP<First, SourceT>,

//     ...PipeParams<
//       [SP<Second, GR<First>>, ...Rest],
//       GR<First>
//     >
//   ]
//   : Funcs

// /** 管道函数 返回类型 */
// type PipeReturn<Funcs extends Fn[], FirstArg = never,> = Funcs extends [...unknown[], (arg: any) => infer R] ? R : FirstArg

// declare function pipe<Funcs extends Fn[]>(...args: PipeParams<Funcs, number>): PipeReturn<Funcs, number>

// // 测试 pipe ---
// declare function num2str(a: O<number>): O<string>
// declare function num2boo(a: O<number>): O<boolean>
// declare function str2num(a: O<string>): O<number>
// declare function str2boo(a: O<string>): O<boolean>
// declare function boo2num(a: O<boolean>): O<number>
// declare function boo2str(a: O<boolean>): O<string>

// pipe(num2str, str2num, num2boo, boo2num)

// // @ts-expect-error 'number' not assignable to 'string'
// pipe(str2num, num2boo, boo2num)

// // @ts-expect-error 'boolean' not assignable to 'string'
// pipe(num2boo, str2num, num2boo)

// pipe(num2boo, boo2str)

// // @ts-expect-error 'boolean' not assignable to 'number'
// pipe(num2boo, num2str)

// pipe(num2boo)

// pipe()

// type TypeToType = []

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


type DecInTen<N extends number> = `${N}` extends keyof NumMap ? NumMap[`${N}`][1] : never
type IncInTen<N extends number> = `${N}` extends keyof NumMap ? NumMap[`${N}`][2] : never

type AddInTen<N1 extends number, N2 extends number> =
  N1 extends 0 ? N2 :
  N2 extends 0 ? N1 :
  AddInTen<IncInTen<N1>, DecInTen<N2>>


type NumToArr<N extends number> = Split<`${N}`>


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



// 半加器 HalfAdder<9, 9> -> [8, 1]
type HalfAdder<N1 extends number, N2 extends number> =
  `${AddInTen<N1, N2>}` extends `${infer K extends number}`
  ? `${K}` extends keyof HalfAddMap
  ? HalfAddMap[`${K}`]
  : never
  : never




type AddInAny<N1 extends string[], N2 extends string[], Carry extends number = 0, Result extends string = ''> =
  N1 extends []
    ? N2 extends []
      ? Carry extends 0
        ? Result
        : `${1}${Result}`
      : Carry extends 0
        ? `${Join<N2>}${Result}`
        : AddInAny<['1'], N2, 0, Result>
    : N2 extends []
      ? Carry extends 0
        ? `${Join<N1>}${Result}`
        : AddInAny<['1'], N1, 0, Result>
      : HalfAdder<AddInTen<ToNumber<Last<N1>>, Carry>, ToNumber<Last<N2>>> extends [infer N extends number, infer C extends number]
        ? AddInAny<Pop<N1>, Pop<N2>, C, `${N}${Result}`>
        : never

type Add<N1 extends number, N2 extends number> =
  ToNumber< AddInAny<NumToArr<N1>, NumToArr<N2>>>

type Q = Add<90, 12>




