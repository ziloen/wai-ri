import type { Dispatch, RefObject, SetStateAction } from 'react'


// export type MaybeRef<T = any> = T | RefObject<T>

export type StateSetter<T> = Dispatch<SetStateAction<T>>

export type MaybeElementRef<T = Element> = T | RefObject<T>