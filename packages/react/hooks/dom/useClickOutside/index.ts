// 参考(抄袭😀): https://vueuse.org/core/onClickOutside/

import type { RefObject } from 'react'
import { useEffect, useLayoutEffect, useRef } from 'react'

type PointerElement = HTMLElement | SVGElement
type MaybeElementRef = PointerElement | RefObject<PointerElement>
type Handler = (evt: PointerEvent) => void
interface OnClickOutsideOptions {
  /**
   * List of elements that should not trigger the event.
   */
  ignore?: MaybeElementRef[]
  /**
   * Use capturing phase for internal event listener.
   * @default true
   */
  capture?: boolean
  //  detectIframe?: boolean
}


/**
 * 监听元素外点击事件
 * @param target
 * @param handler
 * @param options
 */
export function useClickOutside(target: MaybeElementRef, handler: Handler, options?: OnClickOutsideOptions): void {
  const savedHandler = useRef(handler)

  useLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = target instanceof Element ? target : target.current
    if (!targetElement) return

    const evtListener = (e: Event) => { savedHandler.current(e as PointerEvent) }

    targetElement.addEventListener('pointer', evtListener)

    return () => {
      targetElement.removeEventListener('pointerdown', evtListener)
    }
  })
}