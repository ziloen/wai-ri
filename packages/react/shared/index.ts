export * from './type'

import { MaybeRef } from './type'

export function unRefElement<T extends Element = Element>(target: MaybeRef<T>): T {
  return target instanceof Element ? target : target.current as T
}