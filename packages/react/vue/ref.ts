import { Dep } from './dep'
import { triggerEffects } from './effect'
import { toRaw, toReactive } from './reactive'

export const RefSymbol: unique symbol = Symbol("Ref flag")
export declare const RawSymbol: unique symbol

export interface Ref<T = any> {
  value: T,
  [RefSymbol]: true
}

type RefBase<T> = {
  dep?: Dep
  value: T
}

export type UnwrapRef<T> = T extends Ref<infer V> ? V : T


// compare whether a value has changed, accounting for NaN.
function hasChanged(value: any, oldValue: any): boolean {
  return !Object.is(value, oldValue)
}



export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef(r: any): r is Ref {
  return !!(r && r[RefSymbol] === true)
}


export function ref<T extends object>(value: T): [T] extends [Ref] ? T : Ref<UnwrapRef<T>>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref<T>(value?: T) {
  if (isRef(value)) {
    value
  }
  return new RefImpl(value)
}



class RefImpl<T> {
  /** 响应值 */
  #value: T
  /** 原始值 */
  #rawValue: T

  public dep?: Dep = undefined;
  /** Ref 标志 */
  public readonly [RefSymbol] = true

  constructor(value: T) {
    this.#rawValue = value
    this.#value = toReactive(value)
  }

  get value() {
    return this.#value
  }

  set value(newVal) {
    if (hasChanged(newVal, this.#rawValue)) {
      this.#rawValue = newVal
      this.#value = toReactive(newVal)
      triggerRefValue(this, newVal)
    }
  }
}


export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
  ref = toRaw(ref)
  if (ref.dep) {
    triggerEffects(ref.dep)
  }
}


export function unref<T>(ref: T | Ref<T>): T {
  return isRef(ref) ? ref.value : ref
}