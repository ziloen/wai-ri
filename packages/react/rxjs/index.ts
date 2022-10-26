// 参考 rxooks

import { useEffect, useState } from 'react'
import type { Subscription } from 'rxjs'
import { BehaviorSubject } from 'rxjs'
import { VueRef } from '../useVueRef'


/**  */
export function useBehaviorSubject<T>(initVal: T) {
  // const []
  //
  return useState(() => new BehaviorSubject(initVal))[0]
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


/** 结束时自动退订 */
export function useSubscription(sub: Subscription) {
  useEffect(() => () => sub.unsubscribe())
}