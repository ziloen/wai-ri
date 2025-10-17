import { useFn, useLatest } from '@wai-ri/react/shared'
import type { RefCallback } from 'react'

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
export function usePointerCaptureRef<T extends HTMLElement>(options: UsePointerCaptureOptions<T>): RefCallback<T> {
  const optionsRef = useLatest(options)

  return useFn((el) => {
    if (!el) return

    const ac = new AbortController()
    let startPosition = { x: 0, y: 0 }

    el.addEventListener(
      'pointerdown',
      function (downEvent) {
        const { x, y } = downEvent
        /** 如果用户取消捕获 */
        if (optionsRef.current.onStart?.call(this as T, downEvent, { x, y }) === false) return
        /** 保存初始位置 */
        startPosition = { x, y }
        /** 阻止默认行为，防止 user-select 不为 none 时，拖动导致触发 pointercancel 事件，capture 失效() */
        downEvent.preventDefault()

        // firefox 下 releasePointerCapture 时会触发 click 事件
        // 添加临时全局蒙版，pointerup 时触发其他元素的 click 事件
        // bugzilla: https://bugzilla.mozilla.org/show_bug.cgi?id=1694436
        // stackoverflow: https://stackoverflow.com/questions/61797698
        let clickEventMask: HTMLDivElement | undefined
        if (/firefox/i.test(navigator.userAgent)) {
          clickEventMask = document.createElement('div')
          clickEventMask.style.position = 'fixed'
          clickEventMask.style.inset = '0'
          // FIXME: z-index 很容易被其他元素影响导致不在最上层，👿除非设置为上限值 +2147483647
          clickEventMask.style.zIndex = '2147483647'
          document.documentElement.append(clickEventMask)
        }

        /** 使当前元素锁定 pointer */
        el.setPointerCapture(downEvent.pointerId)
        const controller = new AbortController()

        /** 转发 move 事件 */
        el.addEventListener(
          'pointermove',
          function (moveEvent) {
            if (!optionsRef.current.onMove) return

            const { x, y } = moveEvent
            const dx = x - startPosition.x
            const dy = y - startPosition.y
            optionsRef.current.onMove.call(this as T, moveEvent, { x, y, dx, dy })
          },
          { signal: controller.signal, passive: true }
        )

        /** pointerup 停止监听 */
        el.addEventListener(
          'pointerup',
          function (upEvent) {
            /** 移除兼容用添加的临时蒙版 */
            clickEventMask?.remove()
            /** 清除 move 事件监听 */
            controller.abort()
            /** 释放 poniter */
            // 听说不需要 release，pointerup 时会自动调用？
            el.releasePointerCapture(upEvent.pointerId)

            if (!optionsRef.current.onEnd) return
            const { x, y } = upEvent
            const dx = x - startPosition.x
            const dy = y - startPosition.y
            optionsRef.current.onEnd.call(this as T, upEvent, { x, y, dx, dy })
          },
          { once: true }
        )
      },
      { signal: ac.signal }
    )

    return () => ac.abort()
  })
}