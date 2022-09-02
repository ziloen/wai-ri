import { SetParams, UnaryFn } from '@wai-ri/shared/type/Function'



/** 管道函数 参数类型 */
type PipeParams<Funcs extends UnaryFn[], SourceT = never, Len = Funcs['length']> =
  Len extends 0
  ? []
  : Funcs extends [infer First extends UnaryFn, infer Second extends UnaryFn, ...infer Rest extends UnaryFn[]]
  ? [
    // [SourceT] extends [never] ? First :
    SetParams<First, [SourceT]>,

    ...PipeParams<
      [SetParams<Second, [ReturnType<First>]>, ...Rest],
      ReturnType<First>
    >
  ]
  : Funcs



/** 管道函数 返回类型 */
type PipeReturn<Funcs extends UnaryFn[], FirstArg = never,> = Funcs extends [...unknown[], (arg: any) => infer R] ? R : FirstArg

// 测试 pipe ---
// declare function num2str(a: number): string
// declare function num2boo(a: number): boolean
// declare function str2num(a: string): number
// declare function str2boo(a: string): boolean
// declare function boo2num(a: boolean): number
// declare function boo2str(a: boolean): string

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


export function pipe<T>(startValue: T) {
  return function <Fns extends UnaryFn[]>(...fns: PipeParams<Fns, T>): PipeReturn<Fns, T> {
    return fns.reduce((preValue, current) => current(preValue), startValue) as any
  }
}