import { useRef, useState } from 'react'

export type VueRef<T> = {
  value: T
}

/** 类似于 Vue 中 ref 的用法 */
export function ref<T>(initState: (() => T) | T): VueRef<T> {
  const [val, setVal] = useState(initState)
  const latestVal = useRef(val)
  latestVal.current = val

  return {
    get value() { return latestVal.current },
    set value(newValue) { setVal(newValue) }
  }
}