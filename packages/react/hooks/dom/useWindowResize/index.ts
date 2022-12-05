import { useLatest } from '@wai-ri/react'
import { useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { share } from 'rxjs/operators'

const windowResize$ = fromEvent(window, 'resize', { passive: true }).pipe(share({ resetOnRefCountZero: true }))

export function useWindowResize(fn: (event: UIEvent) => void) {
  const fnRef = useLatest(fn)

  useEffect(() => {
    const subscription = windowResize$.subscribe(e => fnRef.current(e as UIEvent))
    return () => subscription.unsubscribe()
  }, [])
}