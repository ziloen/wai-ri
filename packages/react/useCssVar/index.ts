// 参考(抄袭😀): https://vueuse.org/core/useCssVar/

import { RefObject, useEffect } from 'react'
import { ref } from '../ref'


type StyleElement = SVGElement | HTMLElement | MathMLElement
type MaybeStyleElementRef = StyleElement | RefObject<StyleElement>

export function useCssVar(propName: string, target?: MaybeStyleElementRef, initVal = '') {
  const cssVarRef = ref(initVal)

  useEffect(() => {
    const el = target
      ? (target instanceof Element
        ? target
        : target.current)
      : window.document.documentElement

    if (!el?.style) return
    // 动态target? 动态propName?

    el.style.setProperty(propName, cssVarRef.value)

  }, [cssVarRef, target])

  return cssVarRef
}

