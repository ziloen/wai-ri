/** 异步防抖 可.then */
export function asyncDebounce<T extends unknown[], R>(asyncFn: (...orgArgs: T) => Promise<R>, wait = 0) {
  let timer: number
  return function (...args: T): Promise<R> {
    return new Promise(res => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => res(asyncFn(...args)), wait)
    })
  }
}
