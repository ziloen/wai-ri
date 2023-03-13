export * from './lifeCycle'
export * from './type'

import { Fn } from '@wai-ri/shared'
import { useMemo, useRef } from 'react'
import { MaybeElementRef, MaybeRef } from './type'

export function unRefElement<T extends Element = Element>(target: MaybeElementRef<T>): T {
  return target instanceof Element ? target : target.current!
}

export function unRef<T>(value: MaybeRef<T>): T {
  if (
    typeof value !== 'object' ||
    value === null ||
    Object.prototype.toString.call(value) !== '[object Object]'
  ) return value as T

  return (Object.hasOwn(value, 'current') ? value.current : value) as T
}


type TargetType = HTMLElement | Element | Window | Document | null
/**
 * 取出 DOM 元素数组
 * @param value
 * @returns
 */
export function unRefTargetElements<T extends TargetType = Element>(
  value: MaybeRef<T> | MaybeRef<T>[]
): T[] {
  let targetArr
  if (Array.isArray(value)) {
    targetArr = value.map(ref => unRef(ref))
  } else {
    targetArr = [unRef(value)]
  }

  return targetArr
}



type PickFn<T extends (this: any, ...args: any[]) => any> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>

/** "借鉴"的 ahooks useMemoizedFn */
export function useFn<T extends Fn>(fn: T): T {
  const fnRef = useRef(fn)
  fnRef.current = useMemo(() => fn, [fn])

  const memoizedFn = useRef<PickFn<T>>()
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn.current as T
}
