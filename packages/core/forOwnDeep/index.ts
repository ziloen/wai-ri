
// 🚧 因为没有引入 lodash，所以要加一个 forOwn 和 isPlainObject 的实现

function forOwn<T extends Record<any, any>>(obj: T, iteratee: (value: unknown, key: keyof T) => void) {
  const keys = [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]

  for (const key of keys) {
    iteratee(obj[key as keyof T], key)
  }
}

function isPlainObject(value: any): value is object {

  return true
}


/**
 * forOwnDeep 的实现，隐藏第三个参数
 * {@link forOwnDeep forOwnDeep}
 */
function forOwnDeepImpl(
  obj: object,
  iteratee: (key: keyof any, v: any, path: (keyof any)[]) => void,
  path: (keyof any)[] = []
) {
  forOwn(obj, (val, key) => {
    if (isPlainObject(val)) {
      forOwnDeepImpl(val, iteratee, path.concat(key))
    } else {
      iteratee(val as keyof any, key, path.concat(key))
    }
  })
}

/**
 * 深度遍历对象
 * @param obj 要遍历的对象
 * @param iteratee 迭代函数
 */
export function forOwnDeep(
  obj: object,
  iteratee: (value: any, key: keyof any, path: (keyof any)[]) => void
) {
  forOwnDeepImpl(obj, iteratee)
}
