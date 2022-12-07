import { useLatest } from '@wai-ri/react'
import { useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { share } from 'rxjs/operators'

const windowScroll$ = fromEvent(window, 'scroll', { passive: true }).pipe(share({ resetOnRefCountZero: true }))

export function useWindowScroll(fn: (event: Event) => void) {
  const fnRef = useLatest(fn)

  useEffect(() => {
    const subscription = windowScroll$.subscribe(e => fnRef.current(e))
    return () => subscription.unsubscribe()
  }, [])
}