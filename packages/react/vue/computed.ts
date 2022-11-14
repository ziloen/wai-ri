import { Dep } from './dep'
import { ReactiveEffect } from './effect'
import { RefSymbol } from './ref'

export type ComputedGetter<T> = (...args: any[]) => T
export type ComputedSetter<T> = (v: T) => void

export class ComputedRefImpl<T> {
  public dep?: Dep = undefined

  #value!: T
  public readonly effect: ReactiveEffect<T>

  public readonly [RefSymbol] = true


  constructor(
    getter: ComputedGetter<T>
  ) {
    this.effect = new ReactiveEffect(getter, () => { })
  }
}