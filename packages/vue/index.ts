
import { unref } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'


type MaybeRef<T> = T | Ref<T>
type VueInstance = ComponentPublicInstance
type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null
type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends VueInstance ? Exclude<MaybeElement, VueInstance> : T | undefined

export function unrefElement<T extends MaybeElement>(elRef: MaybeElementRef<T>): UnRefElementReturn<T> {
  const plain = unref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}

export function scrollIntoView<T extends HTMLElement | SVGElement | VueInstance | undefined | null>(elRef: T, arg?: boolean | ScrollIntoViewOptions) {
  const el = unrefElement(elRef)
  el && el.scrollIntoView(arg)
}

export function assertNotNilRef<T>(refVal: Ref<T>): asserts refVal is Ref<NonNullable<T>> {
  if (refVal.value === null || refVal.value === undefined)
    throw new Error('断言失败')
}