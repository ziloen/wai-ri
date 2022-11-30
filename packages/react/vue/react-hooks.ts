import { Fn, noop } from '@wai-ri/core'
import { useEffect, useMemo, useRef } from 'react'
import { useLatest, useUpdate } from '../lifeCycle'

export function useVueRef<T>(value: T) {
  // const update = useUpdate()
  // const vueRef = useMemo(() => ref(value), [])
  // useEffect(() => {
  //   const stop = watch(vueRef, update)
  //   return stop
  // }, [])
  // return vueRef
}


/** watch，支持多个源 */
// export function useVueWatch<T>(sourceGetter: () => T, cb: (newValue: T, oldValue: T) => void/* , options */): any
// export function useVueWatch<T>(sourceGetter: (() => T)[], cb: (newValue: T, oldValue: T) => void/* , options */): any
export function useVueWatch<T>(sourceGetter: () => T, cb: (newValue: T, oldValue: T) => void/* , options */) {
  // const callback = useLatest(cb)
  // const stopRef = useRef(noop)
  // useEffect(() => {
  //   const stop = watch(sourceGetter, (...args) => callback.current(...args))
  //   stopRef.current = stop
  //   return stop
  // }, [])
  // return stopRef
}



export function useVueComputed<T>(sourceGetter: () => T) {
  // const ref = useMemo(() => computed(sourceGetter), [])
  // return ref
}


// export function nextTick(fn?: () => void) {
//   const promise = currentFlushPromise || resolvedPromise
//   return fn ? promise.then(fn) : promise
// }