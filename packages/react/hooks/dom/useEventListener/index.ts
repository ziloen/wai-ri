import { MaybeRef, unRef, useLatest } from '../../../index'
import { useRef, useEffect } from 'react'
import { Fn } from '@wai-ri/shared'
import { noop } from '@wai-ri/core'

type TargetType = Element | Window | Document | HTMLElement

/**
 * 事件监听，自动注销
 * @param target 事件绑定元素
 * @param type 时间名称
 * @param listener 监听函数
 * @param options 监听设置
 * @return stop 手动停止监听函数
 */
export function useEventListener<
  T extends HTMLElement | null,
  K extends keyof HTMLElementEventMap
>(
  target: MaybeRef<T>,
  type: K,
  listener: (ev: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): () => void

export function useEventListener<
  T extends Element | null,
  K extends keyof ElementEventMap
>(
  target: MaybeRef<T>,
  type: K,
  listener: (ev: ElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): () => void

export function useEventListener<
  T extends Document | null,
  K extends keyof DocumentEventMap
>(
  target: MaybeRef<T>,
  type: K,
  listener: (ev: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions
): () => void

export function useEventListener<
  T extends Window,
  K extends keyof WindowEventMap
>(
  target: MaybeRef<T>,
  type: K,
  listener: (ev: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
): () => void

export function useEventListener<L extends (e: Event) => void>(
  target: MaybeRef<TargetType | null>,
  type: string,
  listener: L,
  options: AddEventListenerOptions = {}
): () => void {
  const listenerRef = useLatest(listener)
  const cleanupRef = useRef(noop)

  function cleanup() {
    cleanupRef.current()
    cleanupRef.current = noop
  }

  useEffect(() => {
    // 获取监听对象
    const targetElement = unRef(target)
    if (!targetElement?.addEventListener) return

    // 使用中间函数转发，保持 listener 最新
    const eventListener = (e: Event) => listenerRef.current(e)
    targetElement.addEventListener(type, eventListener, options)
    cleanupRef.current = () =>
      targetElement.removeEventListener(type, eventListener, options.capture)
    // 离开时清除监听
    return cleanup
  }, [type, target, options.capture, options.once, options.passive])

  return cleanup
}
