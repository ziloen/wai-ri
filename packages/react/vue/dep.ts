import { ReactiveEffect } from './effect'

export type Dep = Set<ReactiveEffect> & TrackedMarkers


type TrackedMarkers = {
  wasTracked: number
  newTracked: number
}


export function createDep(effects?: ReactiveEffect[]): Dep {
  const dep = new Set<ReactiveEffect>(effects) as Dep
  dep.wasTracked = 0
  dep.newTracked = 0
  return dep
}