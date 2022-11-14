import { isObject } from '@wai-ri/shared'
import { Ref } from './ref'

const RAW = Symbol("Reactive raw flag")
const IS_REACTIVE = Symbol("Is reactive flag")

const ReactiveFlags = {
  RAW,
  IS_REACTIVE
} as const

type Target = {
  [ReactiveFlags.RAW]?: any
  [ReactiveFlags.IS_REACTIVE]?: boolean
}

export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

export function isReactive(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
}


function createReactiveObject(
  target: Target
): any {

}


export function reactive<T extends object>(target: T): T {
  return createReactiveObject(target)
}


export function toReactive<T>(value: T): T {
  return isObject(value) ? reactive(value) : value
}