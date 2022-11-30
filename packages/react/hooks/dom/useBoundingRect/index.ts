import { useEffect, useState } from 'react'
import { MaybeRef, unRef, useEventListener, useResizeObserver } from '../../..'

// FIXME: ResizeObserver 无法检测 css 和 父元素 transition & transform & animate 位置变化导致的元素位置变化
type UseBoundingRectOptions = {
  /**
   * Reset values to 0 on component unmounted
   *
   * @default true
   */
  reset?: boolean

  /**
   * Listen to window resize event
   *
   * @default true
   */
  windowResize?: boolean

  /**
   * Listen to window scroll event
   *
   * @default true
   */
  windowScroll?: boolean

  /**
   * Immediately call update on component mounted
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * 监听元素包围盒变化
 * ```tsx
 * const targetElementRef = useRef<HTMLDivElement>(null)
 *
 * // [当前状态，手动触发更新]
 * const [targetBoundingRect, updateTargetBoundingRect] = useBoundingRect(targetElementRef, { windowScroll: false })
 *
 * useEffect(() => {
 *   updateTargetBoundingRect()
 * },[])
 *
 * return <div>
 *   <div ref={targetElementRef}></div>
 *   <span>top: {targetBoundingRect.top}</span>
 * </div>
 * ```
 */
export function useBoundingRect(
  target: MaybeRef<Element | null>,
  options: UseBoundingRectOptions = {}
) {
  const {
    reset = false,
    windowResize = true,
    windowScroll = true,
    immediate = true
  } = options

  /** 包围盒状态 */
  const [bounding, setBounding] = useState<DOMRect>(() => {
    const el = unRef(target)
    if (!el) return new DOMRect
    return el.getBoundingClientRect()
  })

  /** 更新包围盒状态 */
  function update(bounding?: any) {
    if (bounding instanceof DOMRect) return setBounding(bounding)

    const el = unRef(target)

    if (!el) {
      if (reset) setBounding(new DOMRect)
      return
    }
    setBounding(el.getBoundingClientRect())
  }

  /** 监听目标大小变化 */
  useResizeObserver(target, update)

  /** 监听 window 滚动和大小变化（如果需要） */
  useEffect(() => {
    if (windowResize) {
      window.addEventListener('resize', update, { passive: true })
    }

    if (windowScroll) {
      window.addEventListener('scroll', update, { passive: true })
    }

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [windowResize, windowScroll])

  /** 如果需要立即执行 */
  useEffect(() => {
    if (immediate) update()
  }, [])

  // 因为 css transform 和 transiton 还有 父元素位置变动导致的位置变化不会被上面的事件监听到，所以把更新函数也暴露出去
  // 手动触发可以传要改的值，不传则默认从元素上取
  /** [包围盒，手动触发函数] */
  return [bounding, update as (bounding?: DOMRect) => void] as const
}