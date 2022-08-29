import type { Extensible } from '@wai-ri/shared'

export * from '@wai-ri/shared'
export * from './asyncDebounce'
export * from './bindAll'
export * from './bindSelf'
export * from './clamp'
export * from './escapeRegExp'
export * from './getAllKeys'
export * from './ignoreReject'
export * from './lerp'
export * from './nothing'
export * from './patternMatching'
export * from './pipe'
export * from './sleep'
export * from './switchLatest'
export * from './trimString'
export * from './useEnum'



export const extend: <T, U extends Extensible<Partial<T>>>(target: T, source: U) => T = Object.assign