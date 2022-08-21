import { Fn } from '@wai-ri/shared'
import { useCallback, useRef, useState } from 'react'

export type VueRef<T> = {
  value: T
}

/** 类似于 Vue 中 ref 的用法 */
export function ref<T>(initState: (() => T) | T): VueRef<T> {
  const [state, setState] = useState(initState)
  const latestState = useRef(state)
  latestState.current = state

  return {
    get value() { return latestState.current },
    set value(newState) { setState(latestState.current = newState) }
  }
}



/** 不需要改变的函数 */
export function useFn<T extends Fn>(fn: T): T {
  return useCallback(fn, [])
}