/** 绑定对象上的所有函数 */
export function bindAll<T extends Record<keyof any, any>>(obj: T): T {
  for (const key in obj) {
    const val = obj[key]
    if (typeof val === 'function') obj[key] = Function.prototype.bind.call(val, obj)
  }
  return obj
}
// export function bindAll<T extends Record<keyof any, any>>(obj: T): T {
//   for (const key of getAllMethods(obj)) {
//     (<any>obj)[key] = obj[key].bind(obj)
//   }
//   return obj
// }


/** 找出所有可用的方法 */
// function getAllMethods(object: any) {
//   const methods = new Set<string | symbol>()
//   const proto = Object.prototype

//   for (let temp = object; temp !== proto; temp = Reflect.getPrototypeOf(temp)) {
//     for (const key of Reflect.ownKeys(temp)) {
//       typeof Reflect.getOwnPropertyDescriptor(temp, key)?.value === 'function' && !methods.has(key) && methods.add(key)
//     }
//   }
//   return methods
// }
