import type { Fn } from '@wai-ri/shared'
import { noop } from '../noop'



/** 忽略 Promise 的 .catch 错误，只有 resolve 会继续传递 */
export async function ignoreReject<T>(promise: Promise<T>, errorHandle: Fn = noop): Promise<T> {
  return new Promise((res) => promise.then(res, errorHandle))
}