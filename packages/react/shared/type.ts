import type { Dispatch, SetStateAction, RefObject } from 'react'


// export type MaybeRef<T = any> = T | RefObject<T>

export type StateSetter<T> = Dispatch<SetStateAction<T>>

export type MaybeElementRef = Element | RefObject<Element>