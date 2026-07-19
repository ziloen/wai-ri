import type { Function } from '@wai-ri/shared'



// 参考 https://github.com/microsoft/TypeScript/issues/30370#issuecomment-1079751166
/** 管道函数 参数类型 */
type PipeParams<Funcs extends Function.UnaryFn[], SourceT = never, Len = Funcs['length']> =
  Len extends 0
    ? []
    : Funcs extends [infer First extends Function.UnaryFn, infer Second extends Function.UnaryFn, ...infer Rest extends Function.UnaryFn[]]
      ? [
          // [SourceT] extends [never] ? First :
          Function.SetParams<First, [SourceT]>,
          ...PipeParams<
            [Function.SetParams<Second, [ReturnType<First>]>, ...Rest],
            ReturnType<First>
          >
        ]
      : Funcs



/** 管道函数 返回类型 */
type PipeReturn<
  Funcs extends Function.UnaryFn[],
  FirstArg = never
> = Funcs extends [...unknown[], (arg: any) => infer R]
  ? R
  : FirstArg

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
  return function <Fns extends Function.UnaryFn[]>(...fns: PipeParams<Fns, T>): PipeReturn<Fns, T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return fns.reduce((preValue, current) => current(preValue), startValue) as PipeReturn<Fns, T>
  }
}
