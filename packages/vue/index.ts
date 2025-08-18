export * from './dom'
export * from './shared'

import type { ComponentPublicInstance, Ref } from 'vue'
import { onMounted, onUnmounted, unref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'


type MaybeRef<T> = T | Ref<T>
type VueInstance = ComponentPublicInstance
type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null
type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
type UnRefElementReturn<
  T extends MaybeElement = MaybeElement
> = T extends VueInstance
  ? Exclude<MaybeElement, VueInstance>
  : T | undefined



/**
 * 解开元素
 * @param elRef
 * @returns
 */
export function unrefElement<T extends MaybeElement>(elRef: MaybeElementRef<T>): UnRefElementReturn<T> {
  const plain = unref(elRef)
  return ((plain as (VueInstance | undefined))?.$el ?? plain) as UnRefElementReturn<T>
}



/**
 * 滚动元素到视口
 * @param elRef 目标元素
 * @param arg 参数
 */
export function scrollIntoView(
  elRef: MaybeElementRef,
  arg?: boolean | ScrollIntoViewOptions
) {
  const el = unrefElement(elRef)
  el?.scrollIntoView(arg)
}



/**
 * 断言非空Ref
 * @param refVal Ref值
 * @deprecated 使用 asType
 */
export function assertNotNilRef<T>(refVal: Ref<T>): asserts refVal is Ref<NonNullable<T>> {
  if (refVal.value === null || refVal.value === undefined) throw new Error('断言失败')
}



/**
 * 新标签打开路由
 * @param to 目标路由
 */
export function openRoute(to: RouteLocationRaw) {
  // 无效，错误用法
  const router = useRouter()
  globalThis.open(router.resolve(to).href, '_blank')
}


/**
 * @todo 新函数，在改变路由时取消请求
 */
function useCancleAxiosOnExit() {
  onUnmounted(() => { })
}

/**
 * 类似 React useEffect(initFn, [])
 * @param initFn
 */
export function useLifetime(initFn: () => undefined | (() => void)): void {
  let destoryFn: (() => void) | undefined
  onMounted(() => destoryFn = initFn())
  onUnmounted(() => { typeof destoryFn === 'function' && destoryFn() })
}