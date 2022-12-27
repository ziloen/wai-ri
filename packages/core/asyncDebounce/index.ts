import { asType, Fn, Number as N } from '@wai-ri/shared'



type DebounceOption<MaxWait extends number> = {
  /** 最大等待时间，在不停触发的情况下，至少多少毫秒调用一次，类似节流 */
  maxWait?: N.CheckNegative<MaxWait>
  /** 立即调用(不在防抖时间内时) */
  // immediate?: boolean
}


/**
 * 异步防抖 可.then
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
  Return,
  Wait extends number,
  MaxWait extends number
>(
  asyncFn: Fn<Params, Return>,
  wait: N.CheckNegative<Wait> = <any>0,
  options: DebounceOption<MaxWait> = {}
) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let maxTimer: ReturnType<typeof setTimeout> | undefined

  const { maxWait/* , immediate */ } = options

  asType<number>(maxWait)
  asType<number>(wait)
  asType<Fn<any[], Awaited<Return>>>(asyncFn)

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