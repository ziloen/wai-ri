import { nothing } from '../nothing'

/** 忽略 Promise 的 .catch 错误，只有 resolve 会继续传递 */
export async function ignoreReject<T>(promise: Promise<T>): Promise<T> {
  return new Promise(resolve => { promise.then(resolve).catch(nothing) })
}