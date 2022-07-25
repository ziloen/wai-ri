/** 断言 值不为空，为空抛出错误 */
export function assertNotNil<T>(val: T): asserts val is NonNullable<T> {
  if (val === null || val === undefined)
    throw new Error('断言失败')
}
