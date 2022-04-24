import { Extension } from '@wai-ri/shared'

export * from '@wai-ri/shared'

export * from './asyncDebounce'
export * from './bindAll'
export * from './nothing'
export * from './ignoreReject'
export * from './trimString'
export * from './useEnum'
export * from './sleep'
export * from './switchLatest'

export const extend: <T, U extends Extension<Partial<T>>>(target: T, source: U) => T = Object.assign