import { Ref, onBeforeUnmount, onMounted, unref } from 'vue'

type Positon = {
  /** 当前 clientX */
  x: number
  /** 当前 clientY */
  y: number

}

type MovePosition = {
  /** 离起点的 x */
  dx: number
  /** 离起点的 y */
  dy: number
} & Positon

type UsePointerCaptureOptions = {
  /**
   * 开始捕获指针的回调函数，返回 `false` 来阻止捕获指针
   */
  onStart?: (event: PointerEvent, position: Positon) => (void | false)

  /**
   * 移动过程中的回调函数
   */
  onMove?: (event: PointerEvent, position: MovePosition) => void

  /**
   * 捕获结束后的回调函数
   */
  onEnd?: (event: PointerEvent, position: MovePosition) => void
}

/** 锁定 pointer move 事件 */
export function usePointerCapture(
  target: Ref<HTMLDivElement | undefined | null> | HTMLDivElement | undefined | null,
  { onMove, onEnd, onStart }: UsePointerCaptureOptions
) {
  const useEventAC = new AbortController

  onMounted(() => {
    let startPosition = { x: 0, y: 0 }
    const el = unref(target)
    if (!el) return
    el.addEventListener('pointerdown', e => {
      const { x, y } = e
      /** 如果用户取消捕获 */
      if (onStart?.(e, { x, y }) === false) return
      /** 保存初始位置 */
      startPosition = { x, y }
      /** 阻止默认行为，防止 user-select 不为 none 时，拖动导致 capture 失效 */
      e.preventDefault()

      /** firefox 下 releasePointerCapture 时会触发 click 事件，添加临时全局蒙版 */
      const clickEventMask = document.createElement('div')
      clickEventMask.style.position = 'fixed'
      clickEventMask.style.inset = '0'
      // FIXME: z-index 很容易被其他元素影响导致不在最上层
      clickEventMask.style.zIndex = '1'
      document.documentElement.append(clickEventMask)

      /** 使当前元素锁定 pointer */
      el.setPointerCapture(e.pointerId)
      const controller = new AbortController

      /** 转发 move 事件 */
      el.addEventListener(
        'pointermove',
        e => {
          const { x, y } = e
          const dx = x - startPosition.x
          const dy = y - startPosition.y
          onMove?.(e, { x, y, dx, dy })
        },
        { signal: controller.signal, passive: true }
      )

      /** pointerup 停止监听 */
      el.addEventListener(
        'pointerup',
        e => {
          const { x, y } = e
          const dx = x - startPosition.x
          const dy = y - startPosition.y
          /** 移除添加的临时蒙版 */
          clickEventMask.remove()
          /** 清除 move 事件监听 */
          controller.abort()
          /** 释放 poniter */
          el.releasePointerCapture(e.pointerId)
          onEnd?.(e, { x, y, dx, dy })
        },
        { once: true }
      )
    }, { signal: useEventAC.signal })
  })

  onBeforeUnmount(() => {
    useEventAC.abort()
  })
}