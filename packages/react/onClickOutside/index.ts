// 参考(抄袭😀): https://vueuse.org/core/onClickOutside/

import { RefObject, useEffect, useLayoutEffect, useRef } from 'react'

type PointerElement = HTMLElement | SVGElement
type MaybeElementRef = PointerElement | RefObject<PointerElement>
type Handler = (evt: PointerEvent) => void
type OnClickOutsideOptions = {
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
export function onClickOutside(target: MaybeElementRef, handler: Handler, options?: OnClickOutsideOptions) {
  const savedHandler = useRef(handler)

  useLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = target instanceof Element ? target : target.current
    if (!targetElement || !targetElement.addEventListener) return

    const evtListener: typeof handler = (e) => savedHandler.current(e);

    targetElement.addEventListener('pointer', evtListener as any)

    return () => {
      targetElement.removeEventListener('pointerdown', evtListener as any)
    }
  })
}