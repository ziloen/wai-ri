// 参考 rxooks

import { noop } from '@wai-ri/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BehaviorSubject, Subscription, exhaustMap, fromEvent, Observable } from 'rxjs'
import { VueRef } from '../../useVueRef'


/**  */
export function useBehaviorSubject<T>(initVal: T) {
  // const []
  //
  // return useState(() => new BehaviorSubject(initVal))[0]
  const state$ = useMemo(() => new BehaviorSubject(initVal), [])
}


export function useBehaviorSubjectRef<T>(subject: BehaviorSubject<T>): VueRef<T> {
  const [state, setState] = useState(subject.value)

  useEffect(() => {
    const subscription = subject.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [subject])


  return Object.freeze({
    set value(newValue) {
      subject.next(newValue)
    },
    get value() {
      return state
    }
  }) as any
}


/**
 * 结束时自动退订
 * ```ts
 * useSubscription(() =>
 *   click$
 *     .pipe(
 *       map(e => e.x),
 *       exhaustMap(x => fetch(...))
 *     )
 * ).subscribe(result => setState(result))
 * ```
 */
export function useSubscription<T>(fn: () => Observable<T>) {
  const ob = fn()

  // const subscription = useRef<Subscription | undefined>()

  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  const subscription = useRef<Partial<Observable<T>> | ((value: T) => void)>(noop)

  useEffect(() => {
    const sub = ob.subscribe((...args) => {
      subscription.current
    })
    return () => sub.unsubscribe()
  }, [])

  return {
    subscribe: (observer?: Partial<Observable<T>> | ((value: T) => void)) => {

    }
  }
}