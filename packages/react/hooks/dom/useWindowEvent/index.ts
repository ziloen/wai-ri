import { useLatest } from '@wai-ri/react'
import { useEffect } from 'react'
import { fromEvent, Observable } from 'rxjs'
import { share } from 'rxjs/operators'


function craeteSharedSubscribeHook<V>(observerable: Observable<V>) {
  const shareable$ = observerable.pipe(share({ resetOnRefCountZero: true }))

  return function (fn: (value: V) => void) {
    const fnRef = useLatest(fn)
    useEffect(() => {
      const subscription = shareable$.subscribe(e => fnRef.current(e))
      return () => subscription.unsubscribe()
    }, [])
  }
}

export const useWindowKeyup = craeteSharedSubscribeHook(
  fromEvent<KeyboardEvent>(window, 'keyup', { passive: true, capture: true })
)
export const useWindowScroll = craeteSharedSubscribeHook(
  fromEvent(window, 'scroll', { passive: true, capture: true })
)
export const useWindowResize = craeteSharedSubscribeHook(
  fromEvent<UIEvent>(window, 'resize', { passive: true, capture: true })
)
export const useWindowPointer = craeteSharedSubscribeHook(
  fromEvent(window, 'pointermove', { passive: true, capture: true })
)