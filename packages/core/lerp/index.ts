import { Fn } from '@wai-ri/shared'

/**
 * 插值
 * @param start 开始值
 * @param stop 结束值
 */
export function lerp(start: number, stop: number): Fn<[number], number>
export function lerp(start: number, stop: number, amt: number): number
export function lerp(start: number, stop: number, amt?: number): number | Fn<[number], number> {
  if (amt) {
    return amt * (stop - start) + start
  } else {
    return function (a: number) {
      return a * (stop - start) + start
    }
  }
}