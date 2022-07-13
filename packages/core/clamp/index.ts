import type { Number as N } from '@wai-ri/shared'
import { isNil } from '@wai-ri/shared'


type MaybeNumber = number | undefined | null
/** 限定数值大小 */
export function clamp<Min extends number, Max extends number>(n: number, min: N.CheckNaN<Min>, max: N.CheckNaN<Max>): number
export function clamp<Min extends number, Max extends number>(n: MaybeNumber[], min: N.CheckNaN<Min>, max: N.CheckNaN<Max>): MaybeNumber[]
export function clamp<Min extends number, Max extends number>(n: number | MaybeNumber[], min: N.CheckNaN<Min>, max: N.CheckNaN<Max>): number | MaybeNumber[] {
  if (Array.isArray(n))
    return n.map(v => _clamp(v, min as number, max as number))

  else
    return _clamp(n, min as number, max as number)
}



function _clamp<T>(n: T, min: number, max: number): T extends number ? number : number | undefined {
  if (Number.isNaN(n) || isNil(n))
    return undefined as any

  else
    return Math.max(Math.min(n as number, max), min)
}


