import { Fn } from '@wai-ri/shared'
import { nothing } from '../nothing'



/** 忽略 Promise 的 .catch 错误，只有 resolve 会继续传递 */
export function ignoreReject<T>(promise: Promise<T>, errorHandle: Fn = nothing): Promise<T> {
  return new Promise(res => promise.then(res, errorHandle))
}