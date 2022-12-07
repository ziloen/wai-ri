import { useLatest } from '@wai-ri/react/shared'
import { useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { share } from 'rxjs/operators'

const pointerMove$ = fromEvent(window, 'pointermove', { passive: true }).pipe(share({ resetOnRefCountZero: true }))

export function usePointer(fn: (event: PointerEvent) => void) {
  const fnRef = useLatest(fn)

  useEffect(() => {
    const subscription = pointerMove$.subscribe(e => fnRef.current(e as PointerEvent))
    return () => subscription.unsubscribe()
  }, [])
}