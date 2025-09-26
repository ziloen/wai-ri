type Options = Partial<{
  // 过滤保留哪些
  filter: (key: string | symbol, descriptor: PropertyDescriptor) => boolean
  deep: number
}>

/** 获取所有属性名，类似 Reflect.ownKeys，但会检查原型链（不包括Objec.prototype） */
export function getAllKeys(obj: Record<PropertyKey, any> /* , options?: Options */): (string | symbol)[] {
  const objProto = Object.prototype
  const keysSet = new Set<symbol | string>
  for (let temp: object = obj; temp !== objProto; temp = Reflect.getPrototypeOf(temp)!) {
    for (const key of Reflect.ownKeys(temp)) keysSet.add(key)
  }
  return Array.from(keysSet)
}