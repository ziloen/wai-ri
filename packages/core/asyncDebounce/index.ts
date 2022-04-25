import type { AsyncFn } from '@wai-ri/shared'

/** 异步防抖 可.then */
export function asyncDebounce<Params extends unknown[], Return>(asyncFn: AsyncFn<Params, Return>, wait = 0) {
  let timer: number
  return function (...args: Params): Promise<Return> {
    return new Promise(res => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => res(asyncFn(...args)), wait)
    })
  }
}