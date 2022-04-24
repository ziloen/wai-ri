import { AsyncFn } from '@wai-ri/shared'

/** 切换到最后一次 */
export function switchLatest<Args extends unknown[], R>(asyncFn: AsyncFn<Args, R>) {
  let lastKey: symbol
  return function (...args: Args): Promise<R> {
    return new Promise((res, rej) => {
      const key = lastKey = Symbol()
      asyncFn(...args)
        .then(
          data => lastKey === key && res(data),
          err => lastKey === key && rej(err)
        )
    })
  }
}
