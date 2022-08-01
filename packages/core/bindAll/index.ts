/** 绑定对象上的所有函数 */
export function bindAll<T extends Record<keyof any, any>>(obj: T): T {
  for (const key in obj) {
    const val = obj[key]
    if (typeof val === 'function') obj[key] = Function.prototype.bind.call(val, obj)
  }
  return obj
}