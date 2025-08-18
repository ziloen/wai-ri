import type { AsyncFn, Fn } from '@wai-ri/shared'



/** 切换到最后一次调用 */
/* #__NO_SIDE_EFFECTS__ */
export function switchLatest<
  P extends readonly any[],
  T extends (...args: P) => Promise<unknown>,
>(fn: T): T {
  let lastKey: symbol
  return function fnLatest(...args) {
    return new Promise((res, rej) => {
      const key = lastKey = Symbol()
      fn(...args)
        .then(
          (data) => lastKey === key && res(data),
          // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
          (err: Error) => lastKey === key && rej(err)
        )
    })
  } as T
}


/**
 * 切换到最后一次，但会根据参数决定，只有参数ID相同且不为最后一次会被舍弃
 * @param fn 包装的函数
 * @param identity 获取 ID 函数
 * ```ts
 * function getTarget(id: string) {
 *   return axios.get("/api/target", { params: { id } })
 * }
 *
 * const getTarget_switchLatest = switchLatestWith(getTarget, id => id)
 *
 * function getAndSetTarget(id: string) {
 *   getTarget_switchLatest(id).then(data => store.set(id, data))
 * }
 * ```
 */
/* #__NO_SIDE_EFFECTS__ */
export function switchLatestWith<
  Args extends readonly unknown[],
  Return,
  ID
>(
  fn: AsyncFn<Args, Return>,
  identity: Fn<Args, ID>
): AsyncFn<Args, Return> {
  const idMap = new Map<ID, symbol>

  return function fnLatest(...args) {
    return new Promise((resolve, reject) => {
      const id = identity(...args)
      const key = Symbol()
      idMap.set(id, key)

      fn(...args)
        .then((v) => idMap.get(id) === key && idMap.delete(id) && resolve(v))
        // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
        .catch((e: Error) => idMap.get(id) === key && idMap.delete(id) && reject(e))
    })
  }
}