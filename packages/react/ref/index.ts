import { Fn } from '@wai-ri/shared'
import { useCallback, useRef, useState } from 'react'

export type VueRef<T> = {
  value: T
}

/** 类似于 Vue 中 ref 的用法 */
export function ref<T>(initState: (() => T) | T): VueRef<T> {
  const [state, setState] = useState(initState)
  const latestState = useRef(state)

  const proxyObj = Object.create(null)
  Reflect.defineProperty(proxyObj, '__v_isRef', { value: true })
  Reflect.defineProperty(proxyObj, 'value', {
    get() {
      return latestState.current
    },
    set(newState) {
      setState(latestState.current = newState)
    },
  })

  return Object.freeze(proxyObj)
}



/** 不需要改变的函数 */
export function useFn<T extends Fn>(fn: T): T {
  return useCallback(fn, [])
}



type WatchCallback = any
type WatchOptions<Immediate = boolean> = {
  immediate?: Immediate
  deep?: boolean
}
type WatchStopHandle = () => void


/** 监听某个值 */
function watch<T, Immediate extends Readonly<boolean> = false>(source: T | (() => T), cb: WatchCallback, options?: WatchOptions<Immediate>): WatchStopHandle {

  return () => { }
}