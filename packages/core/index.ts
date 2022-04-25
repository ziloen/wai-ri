import type { Extensible } from '@wai-ri/shared'

export * from '@wai-ri/shared'

export * from './asyncDebounce'
export * from './bindAll'
export * from './nothing'
export * from './ignoreReject'
export * from './trimString'
export * from './useEnum'
export * from './sleep'
export * from './switchLatest'

export const extend: <T, U extends Extensible<Partial<T>>>(target: T, source: U) => T = Object.assign