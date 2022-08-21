// 参考(抄袭😀): https://vueuse.org/core/useCssVar/

import { RefObject, useEffect } from 'react'
import { ref } from '../ref'


type StyleElement = SVGElement | HTMLElement | MathMLElement
type MaybeStyleElementRef = StyleElement | RefObject<StyleElement>

export function useCssVar(propName: string, target: MaybeStyleElementRef, initVal = '') {
  const cssVarRef = ref(initVal)

  useEffect(() => {
    if (!target) return
    const el = target instanceof Element ? target : target.current
    if (!el) return

    el.style.setProperty(propName, cssVarRef.value)

    return () => {
      el.style.removeProperty(propName)
    }
  }, [cssVarRef.value, target])

  return cssVarRef
}

