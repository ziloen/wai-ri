import { useLatest } from '@wai-ri/react/shared'
import { useEffect } from 'react'
import { fromEvent, share } from 'rxjs'



export function usePointer(target: any, fn: (event: PointerEvent) => void) {

  // return { x, y, left, top, bottom, right, isInside }...
}