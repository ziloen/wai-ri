// 参考 rxooks

import { noop } from '@wai-ri/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BehaviorSubject, Observable, Subscription, exhaustMap, fromEvent } from 'rxjs'
import { VueRef } from '../../useVueRef'


/**  */
function useBehaviorSubject<T>(initVal: T) {
  // const []
  //
  // return useState(() => new BehaviorSubject(initVal))[0]
  const state$ = useMemo(() => new BehaviorSubject(initVal), [])
}


function useBehaviorSubjectRef<T>(subject: BehaviorSubject<T>): VueRef<T> {
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
 * 自动 unsubscribe
 * ```ts
 * const subscriber = useFn(data => console.log(data))
 *
 * useSubscription(() =>
 *   click$
 *     .pipe(
 *       map(e => e.x),
 *       exhaustMap(x => fetch(...))
 *     )
 *    .subscribe(subscriber)
 * )
 * ```
 */
export function useSubscription(fn: () => Subscription) {
  useEffect(() => {
    const subscription = fn()
    return () => subscription.unsubscribe()
  }, [])
}