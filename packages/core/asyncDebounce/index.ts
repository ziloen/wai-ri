import type { AsyncFn } from '@wai-ri/shared'

/**
 * 异步防抖 可.then
 * @example
 * const debouncedAsyncFn = asyncDebounce(someAsyncFn, 200)
 *
 * function onSearch() {
 *   const id = 1
 *   debouncedAsyncFn(id)
 *    .then(data => doSomething(data))
 *    .catch(err => catchErr(err))
 * }
 */
export function asyncDebounce<Params extends unknown[], Return>(asyncFn: AsyncFn<Params, Return>, wait = 0) {
  let timer: number
  return async function (...args: Params): Promise<Return> {
    return new Promise(res => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => res(asyncFn(...args)), wait)
    })
  }
}