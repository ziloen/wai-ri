import { useLatest } from '@wai-ri/react/shared'


/** 锁定 pointer move 事件 */
export function usePointerCapture(
  onPointerMove: (event: PointerEvent) => void,
  onPointerUp?: (event: PointerEvent) => void
) {
  const handleRef = useLatest(onPointerMove)

  return function startPointCapture(e: React.PointerEvent<HTMLElement> | PointerEvent) {
    /** 阻止默认行为，防止 user-select 不为 none 时，拖动导致 capture 失效 */
    e.preventDefault()

    /** firefox 下 releasePointerCapture 时会触发 click 事件，添加临时全局蒙版 */
    const clickEventMask = document.createElement('div')
    clickEventMask.style.position = 'fixed'
    clickEventMask.style.inset = '0'
    // FIXME: z-index 很容易被其他元素影响导致不在最上层
    clickEventMask.style.zIndex = '1'
    document.documentElement.append(clickEventMask)

    const target = e.currentTarget as HTMLElement
    /** 使当前元素锁定 pointer */
    target.setPointerCapture(e.pointerId)
    const controller = new AbortController

    /** 转发 move 事件 */
    target.addEventListener(
      'pointermove',
      e => handleRef.current(e),
      { signal: controller.signal, passive: true }
    )

    /** pointerup 停止监听 */
    target.addEventListener(
      'pointerup',
      e => {
        /** 转发 up 事件 */
        onPointerUp?.(e)
        /** 移除添加的临时蒙版 */
        clickEventMask.remove()
        /** 清除 move 事件监听 */
        controller.abort()
        /** 释放 poniter */
        target.releasePointerCapture(e.pointerId)
      },
      { once: true }
    )
  }
}