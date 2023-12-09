import type { SVGElements } from '@michijs/htmltype'
import type { KeysMatching } from '@wai-ri/shared'
import type { BaseType } from 'd3'



// TODO: 先从 SVGElements 类型转换为字符串，再从字符串映射为 AttrType，有没有办法直接使用类型映射到另一类型？SVGPathElement -> SVGElements['path']
type SVGAttrType<
  T,
  K = KeysMatching<globalThis.SVGElementTagNameMap, T>
> = K extends keyof SVGElements
  ? SVGElements[K]
  : Record<string, string | number | undefined | null>

type ValueFn<T extends BaseType, D, R> = (datum: D, index: number, groups: T[]) => R

/**
 * 同.attr函数参数，但是一次设置多个attr
 * @example
 * selection
 *   .each(setAttrs((data, index, group) => ({
 *     x: index * 50,
 *     y: data.value
 *   })))
 */
export function setAttrs<T extends BaseType, D>(fn: ValueFn<T, D, SVGAttrType<T>>) {
  return function (this: T, ...args: [D, number, any]) {
    if (!(this instanceof Element)) return

    const attrs = Reflect.apply(fn, this, args) as SVGAttrType<T>

    for (const [name, v] of Object.entries(attrs)) {
      if (v === null || v === undefined) this.removeAttribute(name)
      else this.setAttribute(name, String(v))
    }
  }
}