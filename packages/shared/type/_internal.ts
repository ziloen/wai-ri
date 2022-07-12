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

