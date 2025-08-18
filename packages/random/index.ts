/**
 * @todo TODO: 支持负数 random(-5, 5)
 * 生成随机整数 / 取出随机元素
 */
/** 随机 0 | 1 */
export function random(): 0 | 1
/** 生成 [0, 1] 的随机数，float 指定是否为浮点数，浮点数不包含上限*/
export function random(float?: boolean): number
/** 生成 [0, max] 的随机数，float 指定是否为浮点数，浮点数不包含上限 */
export function random(max: number, float?: boolean): number
/** 生成 [min, max] 的随机数，float 指定是否为浮点数，浮点数不包含上限 */
export function random(min: number, max: number, float?: boolean): number
/** 取出数组随机元素 */
export function random<T>(arr: T[]): T
export function random<T>(...args: unknown[]): T | number {

  // 原始随机数
  const _random = Math.random()

  // 数组
  const args_0 = args[0]
  if (Array.isArray(args_0)) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
    return (args_0[~~(_random * args_0.length)]) as T
  }

  // 初始化
  let min = 0, max = 1
  // TODO: Number.isInteger 判断 min 和 max
  const is_float = args.at(-1) === true

  if (typeof args_0 === 'number') {
    if (typeof args[1] === 'number') {

      min = args_0
      max = args[1]
      // if (min < 0) min -= 1;
    } else {
      max = args_0
      // if (max < 0) max -= 1;
    }
  }

  if (min < max) {
    [min, max] = [max, min]
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
  return is_float ? _random * (max - min) + min : ~~(_random * (max + 1 - min) + min)
}