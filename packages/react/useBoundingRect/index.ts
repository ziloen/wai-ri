import { useEffect, useState } from 'react'
import { MaybeRef, unRef, useEventListener, useResizeObserver } from '../'

// TODO: 支持 windowResize 和 windowScroll 可选
type UseBoundingRectOptions = {
  /**
   * Reset values to 0 on component unmounted
   *
   * @default true
   */
  reset?: boolean

  // /**
  //  * Listen to window resize event
  //  *
  //  * @default true
  //  */
  // windowResize?: boolean;

  // /**
  //  * Listen to window scroll event
  //  *
  //  * @default true
  //  */
  // windowScroll?: boolean;

  /**
   * Immediately call update on component mounted
   *
   * @default true
   */
  immediate?: boolean
}

export function useBoundingRect(
  target: MaybeRef<Element | null>,
  options: UseBoundingRectOptions = {}
) {
  const {
    reset = true,
    // windowResize = true,
    // windowScroll = true,
    immediate = true
  } = options

  const [bounding, setBounding] = useState<DOMRect>(new DOMRect)

  function update() {
    const el = unRef(target)

    if (!el) {
      if (reset) {
        setBounding(new DOMRect)
      }
      return
    }

    // const rect =
    // const { x, y, height, width, top, right, bottom, left } = rect;

    setBounding(el.getBoundingClientRect())
  }

  useResizeObserver(target, update)

  // if (windowResize)
  useEventListener(window, 'resize', update, { passive: true })

  // if (windowScroll)
  useEventListener(window, 'scroll', update, { passive: true })

  useEffect(() => {
    if (immediate) update()
  }, [])

  return bounding
}
