export * from './type'

import { MaybeElementRef, MaybeRef } from './type'

export function unRefElement<T extends Element = Element>(target: MaybeElementRef<T>): T {
  return target instanceof Element ? target : target.current as T
}

export function unRef<T>(value: MaybeRef<T>): T {
  if (typeof value !== 'object' || value === null) return value
  return (Object.hasOwn(value, 'current') ? value.current : value) as T
}