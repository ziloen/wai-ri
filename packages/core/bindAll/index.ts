/** 绑定对象上的所有函数 */
export function bindAll<T extends Record<keyof any, any>>(obj: T): T {
  function getAllMethods(object: any) {
    const methods = new Set<string | symbol>()
    for (let temp = object; temp !== Object.prototype; temp = Reflect.getPrototypeOf(temp)) {
      for (const key of Reflect.ownKeys(temp)) {
        typeof Reflect.getOwnPropertyDescriptor(temp, key)?.value === 'function' && !methods.has(key) && methods.add(key)
      }
    }
    return methods
  }
  for (const key of getAllMethods(obj)) {
    (obj as any)[key] = obj[key].bind(obj)
  }
  return obj
}
