import { Timeout } from '@wai-ri/shared'
import { useEffect, useRef, useState } from 'react'

export function useAutoResetState<T>(defautValue: T, afterMs: number) {
  const [state, setState] = useState<T>(defautValue)
  const timeoutRef = useRef<Timeout | undefined>()

  const set: typeof setState = value => {
    setState(value)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setState(defautValue)
    }, afterMs)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return [state, set] as const
}
