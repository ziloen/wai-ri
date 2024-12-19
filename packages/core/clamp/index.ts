import { isNil } from '@wai-ri/shared'



type MaybeNumber = number | undefined | null

/** 限定数值大小 */
export function clamp(n: number, min: number, max: number): number {
  return Math.max(Math.min(n, max), min)
}



/** clamp Array version */
export function clampArray<T extends MaybeNumber[]>(valueArr: T, min: number, max: number): T {
  return valueArr.map((v) => {
    if (Number.isNaN(v) || isNil(v))
      return
    else
      return Math.max(Math.min(v, max), min)
  }) as T
}