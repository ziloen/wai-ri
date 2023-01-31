import { MaybeRef, unRef, useLatest } from '@wai-ri/react/shared'
import { useEffect } from 'react'

type Positon = {
  /** 当前 clientX */
  x: number
  /** 当前 clientY */
  y: number
}

type MovePosition = {
  /** 离起点（pointerDown时位置）的 x */
  dx: number
  /** 离起点（pointerDown时位置）的 y */
  dy: number
} & Positon

type UsePointerCaptureOptions<T> = {
  /**
   * 开始捕获指针的回调函数，返回 `false` 来阻止捕获指针
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onStart?: (this: T, event: PointerEvent, position: Positon) => void | false

  /**
   * 移动过程中的回调函数
   */
  onMove?: (this: T, event: PointerEvent, position: MovePosition) => void

  /**
   * 捕获结束后的回调函数
   */
  onEnd?: (this: T, event: PointerEvent, position: MovePosition) => void
}

/** 锁定 pointer move 事件 */
export function usePointerCapture<T extends HTMLElement>(
  target: MaybeRef<T | null | undefined>,
  { onMove, onEnd, onStart }: UsePointerCaptureOptions<T>
) {
  const onStartRef = useLatest(onStart)
  const onMoveRef = useLatest(onMove)
  const onEndRef = useLatest(onEnd)

  useEffect(() => {
    const el = unRef(target)
    if (!el) return
    let startPosition = { x: 0, y: 0 }
    const controller = new AbortController
    el.addEventListener(
      'pointerdown',
      function (downEvent) {
        const { x, y } = downEvent
        /** 如果用户取消捕获 */
        if (onStartRef.current?.call(this as T, downEvent, { x, y }) === false)
          return
        /** 保存初始位置 */
        startPosition = { x, y }
        /** 阻止默认行为，防止 user-select 不为 none 时，拖动导致触发 pointercancel 事件，capture 失效() */
        downEvent.preventDefault()

        let clickEventMask: HTMLDivElement | undefined
        // TODO: 这里应为 isFirefox
        if (/firefox/i.test(navigator.userAgent)) {
          // firefox 下 releasePointerCapture 时会触发 click 事件
          // 添加临时全局蒙版，pointerup 时触发其他元素的 click 事件
          // bugzilla: https://bugzilla.mozilla.org/show_bug.cgi?id=1694436
          // stackoverflow: https://stackoverflow.com/questions/61797698
          clickEventMask = document.createElement('div')
          clickEventMask.style.position = 'fixed'
          clickEventMask.style.inset = '0'
          // FIXME: z-index 很容易被其他元素影响导致不在最上层
          clickEventMask.style.zIndex = '9999'
          document.documentElement.append(clickEventMask)
        }

        /** 使当前元素锁定 pointer */
        el.setPointerCapture(downEvent.pointerId)
        const controller = new AbortController

        /** 转发 move 事件 */
        el.addEventListener(
          'pointermove',
          function (moveEvent) {
            const { x, y } = moveEvent
            const dx = x - startPosition.x
            const dy = y - startPosition.y
            onMoveRef.current?.call(this as T, moveEvent, { x, y, dx, dy })
          },
          { signal: controller.signal, passive: true }
        )

        /** pointerup 停止监听 */
        el.addEventListener(
          'pointerup',
          function (upEvent) {
            const { x, y } = upEvent
            const dx = x - startPosition.x
            const dy = y - startPosition.y
            /** 移除兼容用添加的临时蒙版 */
            clickEventMask?.remove()
            /** 清除 move 事件监听 */
            controller.abort()
            /** 释放 poniter */
            // 听说不需要 release，pointerup 时会自动调用？
            // el.releasePointerCapture(upEvent.pointerId)
            onEndRef.current?.call(this as T, upEvent, { x, y, dx, dy })
          },
          { once: true }
        )
      },
      { signal: controller.signal }
    )

    return () => controller.abort()
  }, [])
}
