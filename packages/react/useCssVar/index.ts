// 参考(抄袭😀): https://vueuse.org/core/useCssVar/

import { useEffect, useRef } from 'react'
import { MaybeRef, unRef } from '../shared'
import { useVueRef } from '../useVueRef'


type StyleElement = SVGElement | HTMLElement | MathMLElement | null | undefined
type MaybeStyleElementRef = MaybeRef<StyleElement>

export function useCssVar(
  propName: string,
  target: MaybeStyleElementRef = globalThis.document.documentElement,
  initVal = ''
) {
  const cssVarRef = useVueRef(initVal)

  useEffect(() => {
    const el = unRef(target)
    if (!el?.style) return
    // 动态target? 动态propName？return removeProperty(lastPropName)
    el.style.setProperty(propName, cssVarRef.value)
  }, [cssVarRef.value, target])

  return cssVarRef
}

