import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react'


export type MaybeRef<T = any> = T | RefObject<T> | MutableRefObject<T>

export type StateSetter<T> = Dispatch<SetStateAction<T>>

export type MaybeElementRef<T = Element> = T | RefObject<T>