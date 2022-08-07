import { Fn } from '@wai-ri/shared'

/**
 * 插值
 * @param start 开始值
 * @param stop 结束值
 */
export function lerp(start: number, stop: number): Fn<[number], number>
/**
 * 插值
 * @param start 开始值
 * @param stop 结束值
 * @param amt 比例 0 - 1
 */
export function lerp(start: number, stop: number, amt: number): number
export function lerp(start: number, stop: number, amt?: number): number | Fn<[number], number> {
  if (amt)
    return _lerp(start, stop, amt)

  else
    return (a: number) => _lerp(start, stop, a)
}

function _lerp(start: number, stop: number, amt: number) {
  return amt * (stop - start) + start
}