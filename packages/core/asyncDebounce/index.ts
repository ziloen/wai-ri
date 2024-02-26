import type { Fn, Timeout } from '@wai-ri/shared'



type DebounceOption = {
  /** 最大等待时间，在不停触发的情况下，至少多少毫秒调用一次，类似节流 */
  maxWait?: number
  /** 立即调用(不在防抖时间内时) */
  // immediate?: boolean
}


/**
 * 异步防抖 可.then
 * 
 * @example
 * const debouncedAsyncFn = asyncDebounce(someAsyncFn, 200， { maxWait: 1000 })
 *
 * function onSearch() {
 *   const id = 1
 *   debouncedAsyncFn(id)
 *    .then(data => doSomething(data))
 *    .catch(err => catchErr(err))
 * }
 */
export function asyncDebounce<
  Params extends unknown[],
  Return
>(
  asyncFn: Fn<Params, Return>,
  wait = 0,
  options: DebounceOption = {}
) {
  let timer: Timeout | undefined
  let maxTimer: Timeout | undefined

  const { maxWait/* , immediate */ } = options

  return async function (...args: Params): Promise<Return> {
    return new Promise(res => {
      timer && clearTimeout(timer)

      // 如果有最大延迟时间
      if (maxWait && !maxTimer /** && !immediate */) {
        maxTimer = setTimeout(() => {
          timer && clearTimeout(timer)
          maxTimer = timer = undefined
          res(asyncFn(...args))
        }, maxWait)
      }

      timer = setTimeout(() => {
        maxTimer && clearTimeout(maxTimer)
        maxTimer = timer = undefined
        res(asyncFn(...args))
      }, wait)
    })
  }
}