import { isArray } from '@wai-ri/shared'
import { ComputedRefImpl } from './computed'
import { Dep } from './dep'


export let activeEffect: ReactiveEffect | undefined

// TODO:
export type EffectScheduler = () => void

export class ReactiveEffect<T = any> {
  computed?: ComputedRefImpl<T>

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null
  ) {

  }
}

export function triggerEffects(
  dep: Dep | ReactiveEffect[]
) {
  // spread into array for stabilization
  const effects = isArray(dep) ? dep : [...dep]
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect)
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect)
    }
  }
}


function triggerEffect(
  effect: ReactiveEffect
) {

}