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


export function pipe<T>(startValue: T) {
  return function <Fns extends UnaryFn[]>(...fns: PipeParams<Fns, T>): PipeReturn<Fns, T> {
    return fns.reduce((preValue, current) =>  current(preValue), startValue) as any
  }
}