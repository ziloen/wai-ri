import type { AsyncFn, Fn } from '@wai-ri/shared'



/** 切换到最后一次 */
export function switchLatest<Args extends readonly unknown[], Return>(asyncFn: AsyncFn<Args, Return>) {
  let lastKey: symbol
  return async function (...args: Args): Promise<Return> {
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


/**
 * 切换到最后一次，但会根据参数决定，只有参数ID相同且不为最后一次会被舍弃
 * @param asyncFn 包装的函数
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
export function switchLatestWith<Args extends readonly unknown[], Return, ID>(asyncFn: AsyncFn<Args, Return>, identity: Fn<Args, ID>): AsyncFn<Args, Return> {
  const idMap = new Map<ID, symbol>

  return async function (...args: Args) {
    return new Promise((resolve, reject) => {
      const id = identity(...args)
      const key = Symbol()
      idMap.set(id, key)

      asyncFn(...args)
        .then(v => idMap.get(id) === key && idMap.delete(id) && resolve(v))
        .catch(e => idMap.get(id) === key && idMap.delete(id) && reject(e))
    })
  }
}