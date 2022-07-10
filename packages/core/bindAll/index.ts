/** 绑定对象上的所有函数 */
export function bindAll<T extends Record<keyof any, any>>(obj: T): T {
  for (const key of getAllMethods(obj)) {
    (obj as any)[key] = obj[key].bind(obj)
  }
  return obj
}


function getAllMethods(object: any) {
  const methods = new Set<string | symbol>()
  const proto = Object.prototype
  for (let temp = object; temp !== proto; temp = Reflect.getPrototypeOf(temp)) {
    for (const key of Reflect.ownKeys(temp)) {
      typeof Reflect.getOwnPropertyDescriptor(temp, key)?.value === 'function' && !methods.has(key) && methods.add(key)
    }
  }
  return methods
}
