export * from './type'

import { MaybeElementRef } from './type'

export function unRefElement<T extends Element = Element>(target: MaybeElementRef<T>): T {
  return target instanceof Element ? target : target.current as T
}