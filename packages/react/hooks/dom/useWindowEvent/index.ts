import { useLatest } from '@wai-ri/react'
import { useEffect } from 'react'
import { fromEvent, Observable } from 'rxjs'
import { share } from 'rxjs/operators'


function createSharedEvent<E extends Event>(observerable: Observable<Event>) {
  return function (fn: (event: E) => void) {
    const fnRef = useLatest(fn)
    useEffect(() => {
      const subscription = observerable.subscribe(e => fnRef.current(e as E))
      return () => subscription.unsubscribe()
    }, [])
  }
}

export const useWindowKeyup = createSharedEvent<KeyboardEvent>(
  fromEvent(window, 'keyup').pipe(share())
)
export const useWindowScroll = createSharedEvent(
  fromEvent(window, 'scroll', { passive: true }).pipe(share())
)
export const useWindowResize = createSharedEvent<UIEvent>(
  fromEvent(window, 'resize', { passive: true }).pipe(share())
)