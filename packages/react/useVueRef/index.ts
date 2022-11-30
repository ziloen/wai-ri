import { Fn } from '@wai-ri/shared'
import { useMemo, useRef } from 'react'
import { useUpdate } from '../shared/lifeCycle'

const RAW_SYMBOL = Symbol('VueRef Raw Symbol')

const REF_SYMBOL = Symbol('VueRef Symbol')

export type VueRef<T> = {
  value: T
  [REF_SYMBOL]: true
}

function isRef<T>(v: VueRef<T> | T): v is VueRef<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !!((v as any)?.[REF_SYMBOL] === true)
}

function hasChange<T>(value: T, newValue: T) {
  return !Object.is(value, newValue)
}


function toRaw<T>(observed: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const raw = observed && (observed as any)[RAW_SYMBOL]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return raw ? toRaw(raw) : observed
}

function isObject(value: unknown): value is object {
  return (
    value !== null &&
    typeof value === 'object'
  )
}

function toReactive<T>(target: T, update: Fn): T {
  if (!isObject(target)) return target

  return new Proxy(target, {
    get(target, p, receiver) {
      return p === RAW_SYMBOL ? target : Reflect.get(target, p, receiver)
    },
    set(target, p, newValue, receiver) {
      const oldValue = Reflect.get(target, p, receiver)
      const result = Reflect.set(target, p, newValue, receiver)
      if (hasChange(oldValue, newValue) && result) update()
      return result
    }
  })
}


function track() {

}

function trigger() {

}

/** Ref 实现 */
class RefImpl<T> {
  #rawValue: T
  #value: T
  #update: Fn

  public readonly [REF_SYMBOL] = true

  constructor(value: T, update: Fn) {
    this.#rawValue = toRaw(value)
    this.#update = update
    this.#value = toReactive(value, update)
  }

  get value() {
    return this.#value
  }

  set value(newValue) {
    if (hasChange(newValue, this.#rawValue)) {
      this.#rawValue = newValue
      this.#value = toReactive(newValue, this.#update)
      this.#update()
    }
  }
}

function createRef<T>(target: T | VueRef<T>, update: () => void): VueRef<T> {
  if (isRef(target)) return target
  return new RefImpl(target, update)
}

/** 类似于 Vue 中 ref 的用法 */
export function useVueRef<T>(initState: T): VueRef<T> {
  const update = useUpdate()
  // TODO: 使用 watch 收集依赖来重新渲染而不是使用传值的方式
  // const ref = useMemo(() => createRef(initState), [])
  // watch(ref, update)
  // return ref
  return useMemo(() => createRef(initState, update), [])
}



type PickFn<T extends (this: any, ...args: any[]) => any> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>

/** 抄袭的 ahooks useMemoizedFn */
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