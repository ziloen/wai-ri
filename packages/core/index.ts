import type { Extensible } from '@wai-ri/shared'

export * from '@wai-ri/shared'

export * from './asyncDebounce'
export * from './bindAll'
export * from './escapeRegExp'
export * from './ignoreReject'
export * from './nothing'
export * from './sleep'
export * from './switchLatest'
export * from './trimString'
export * from './useEnum'
export * from './lerp'
export * from './clamp'
export * from './pipe'



export const extend: <T, U extends Extensible<Partial<T>>>(target: T, source: U) => T = Object.assign