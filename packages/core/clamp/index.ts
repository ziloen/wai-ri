import { isNil } from '@wai-ri/shared'


type MaybeNumber = number | undefined | null
/** 限定数值大小 */
export function clamp(n: number, min: number, max: number): number
export function clamp(n: MaybeNumber[], min: number, max: number): MaybeNumber[]
export function clamp(n: number | MaybeNumber[], min: number, max: number): number | MaybeNumber[] {
  if (Array.isArray(n))
    return n.map(v => _clamp(v, min, max))

  else
    return _clamp(n, min, max)
}



function _clamp<T extends MaybeNumber>(n: T, min: number, max: number): T extends number ? number : number | undefined {
  if (Number.isNaN(n) || isNil(n))
    return undefined as any

  else
    return Math.max(Math.min(n, max), min)
}


