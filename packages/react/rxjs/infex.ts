import { useEffect, useState } from 'react'
import type { Subscription } from 'rxjs'
import { BehaviorSubject } from 'rxjs'


/**  */
export function useBehaviorSubject<T>(initVal: T) {
  const [subject] = useState(() => new BehaviorSubject(initVal))
  return subject
}


/** 结束时自动退订 */
export function useSubscription(sub: Subscription) {
  useEffect(() => (() => sub.unsubscribe()))
}