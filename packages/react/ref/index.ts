import { Fn } from '@wai-ri/shared'
import { useCallback, useMemo, useRef, useState } from 'react'

export type VueRef<T> = {
  value: T
  (): T
}

/** 类似于 Vue 中 ref 的用法 */
export function ref<T>(initState: (() => T) | T): VueRef<T> {
  const [state, setState] = useState(initState)
  const latestState = useRef(state)

  const proxyObj = function () {
    return latestState.current
  }

  Reflect.defineProperty(proxyObj, '__v_isRef', { value: true })
  Reflect.defineProperty(proxyObj, 'value', {
    get() { return latestState.current },
    set(newState) { setState(latestState.current = newState); return true },
  })

  // TODO: 监听数组push 等

  return Object.freeze(proxyObj) as VueRef<T>
}


type PickFn<T extends (this: any, ...args: any[]) => any> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>

/** 抄袭的 ahooks useMemoizedFn */
export function useFn<T extends Fn>(fn: T): T {
  const fnRef = useRef(fn)

  fnRef.current = useMemo(() => fn, [fn])
  const memoizedFn = useRef<PickFn<T>>()
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn.current as T
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