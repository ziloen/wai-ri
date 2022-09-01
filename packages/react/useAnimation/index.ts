import { useRef } from 'react'
import { MaybeElementRef, unRefElement } from '../shared'


export function useAnimation(targetRef: MaybeElementRef<HTMLElement>, keyframs: Keyframe[] | PropertyIndexedKeyframes, option?: number | KeyframeEffectOptions): Animation {
  const stateRef = useRef<Animation>()

  if (!stateRef.current) {
    const target = unRefElement(targetRef)
    const animation = new Animation(new KeyframeEffect(target, [], option))
    stateRef.current = animation
  }

  return stateRef.current!
}