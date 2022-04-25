import type { AsyncFn } from '@wai-ri/shared'

/** 切换到最后一次 */
export function switchLatest<Params extends unknown[], Return>(asyncFn: AsyncFn<Params, Return>) {
  let lastKey: symbol
  return function (...args: Params): Promise<Return> {
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
