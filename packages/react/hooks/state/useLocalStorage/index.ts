import { useFn } from '@wai-ri/react/shared'
import { isFn } from '@wai-ri/shared'
import { useState } from 'react'


/** useLocalStorage 设置项 */
type UseStorageOptions<T> = {
  /** storage 对象 */
  storage?: Storage
  /** 序列化函数 */
  serializer?: (v: T) => string
  /** 反序列化函数 */
  deserializer?: (s: string) => T
}

/** 持久化存储状态 */
export function useLocalStorage<T>(
  key: string,
  initialState: T,
  {
    storage = localStorage,
    serializer = JSON.stringify,
    deserializer = JSON.parse
  }: UseStorageOptions<T> = {}
): [
  T,
  (value: T | ((prevState: T) => T)) => void
] {
  const [state, setState] = useState(() => {
    const result = storage.getItem(key)
    if (result === null) return initialState
    return deserializer(result)
  })

  function updateState(value: T | ((prevState: T) => T)) {
    const currentState = isFn(value) ? value(state) : value
    setState(currentState)

    if (currentState === null || currentState === undefined) {
      storage.removeItem(key)
    } else {
      storage.setItem(key, serializer(currentState))
    }
  }

  return [state, useFn(updateState)]
}