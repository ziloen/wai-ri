import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { MaybeRef, unRef } from '../'


// TODO: 能否像 Vue 那样 keep alive，保留状态如视频播放不中断，复用之前的内容不重新生成
type TeleportProps = {
  /**
   * 传送目标容器，querySelector() 或者 目标元素本身
   */
  to: string | MaybeRef<HTMLElement | null>

  /**
   * 留在原地还是传送，disabled 为 true 时留在原地，为 false 时传送至目标容器
   *
   * @default false
   */
  disabled?: boolean
}

export function Teleport({
  to,
  disabled = false,
  children
}: PropsWithChildren<TeleportProps>) {
  if (disabled) return <>{children}</>

  const container =
    typeof to === 'string' ? document.querySelector(to) : unRef(to)

  if (!container) return null

  return createPortal(children, container)
}
