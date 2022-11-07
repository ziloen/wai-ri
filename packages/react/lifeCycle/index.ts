import { Fn } from '@wai-ri/shared'
import { useEffect, useRef, useState } from 'react'



/**
 * 在挂载后执行一次
 */
export function onMounted(fn: () => any) {
  useEffect(fn, [])
}



/**
 * 在卸载后执行一次
 */
export function onUnMounted(fn: () => any) {
  useEffect(() => fn, [])
}



/**
 * 在 Render 阶段执行一次
 */
export function useBeforeMount(fn: () => void) {
  const invokedRef = useRef(false)
  if (!invokedRef.current) {
    fn()
    invokedRef.current = true
  }
}



/**
 * 始终最新值，解决闭包问题。
 * 从 [ahooks](https://ahooks.js.org/hooks/use-latest) 复制
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}



/**
 * 返回触发更新函数
 */
export function useUpdate() {
  const [, setState] = useState<any>()
  return () => setState({})
}



/**
 * 条件执行一次
 * @param fn
 * @param condition
 * @returns
 */
export function useRunUntil(fn: Fn, condition: boolean) {
  const [isDone, setIsDone] = useState(false)
  const fnRef = useLatest(fn)

  if (isDone) return
  if (condition) {
    fnRef.current()
    setIsDone(true)
  }
}
