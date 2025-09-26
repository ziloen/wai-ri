export * from './dom'
export * from './rxjs'
export * from './state'

import { useCallback, useState } from 'react'


/**
 * 解决异步错误无法被 ErrorBoundary 捕获的问题
 * @example
 * ```tsx
 * const [state, setState] = useState()
 * const throwError = useAsyncThrow()
 *
 * useEffect(() => {
 *   someAyncFunc().then(setState).catch(throwError)
 * }, [])
 */
export function useAsyncThrow(): (e: Error) => void {
  const [, set] = useState()
  return useCallback((e: Error) => set(() => { throw e }), [])
}
