import { useLatest } from '@wai-ri/react'
import { useEffect } from 'react'
import { fromEvent, Observable } from 'rxjs'
import { share } from 'rxjs/operators'


function craeteSharedEventHook<E extends Event>(
  observerable: Observable<Event>
) {
  const shareable$ = observerable.pipe(share())

  return function (fn: (event: E) => void) {
    const fnRef = useLatest(fn)
    useEffect(() => {
      const subscription = shareable$.subscribe(e => fnRef.current(e as E))
      return () => subscription.unsubscribe()
    }, [])
  }
}

export const useWindowKeyup = craeteSharedEventHook<KeyboardEvent>(
  fromEvent(window, 'keyup')
)
export const useWindowScroll = craeteSharedEventHook(
  fromEvent(window, 'scroll', { passive: true })
)
export const useWindowResize = craeteSharedEventHook<UIEvent>(
  fromEvent(window, 'resize', { passive: true })
)