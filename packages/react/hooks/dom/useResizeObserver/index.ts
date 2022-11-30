import { MaybeRef, unRefTargetElements, useLatest } from '@wai-ri/react'
import { useEffect } from 'react'


/**
 * 使用 ResizeObserver 监听目标大小变化
 * @param target - 监听目标，可以是元素或元素数组
 * @param callback - 监听函数
 * @param options - 传递给 ResizeObserver 的参数
 */
export function useResizeObserver(
  target: MaybeRef<Element | null> | MaybeRef<Element | null>[],
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
) {
  const callbackRef = useLatest(callback)

  useEffect(() => {
    const targetElementArr = unRefTargetElements(target)
    if (!targetElementArr.length) return

    const observer = new ResizeObserver((e, o) => callbackRef.current(e, o))

    for (const element of targetElementArr) {
      element && observer.observe(element, options)
    }

    return () => observer.disconnect()
  }, [unRefTargetElements(target), options])
}
