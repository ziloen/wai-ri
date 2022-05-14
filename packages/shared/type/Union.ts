

/** 判断是否为联合类型 */
export type IsUnion<T, U = T> = T extends U ? [U] extends [T] ? false : true : never
