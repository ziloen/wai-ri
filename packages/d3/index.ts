import { ObjectType, Fn, Extensible, ExpandDeep, Union, KeysMatching } from '@wai-ri/shared'
import { drag } from 'd3'
import type { Selection, BaseType, DraggedElementBaseType, D3DragEvent } from 'd3'
import type { SVGElements } from '@lsegurado/htmltype'


// FIXME: 因为到处不是类型是 namespace 所以不能直接用 SVGElements[key]， ERROR: connot use namespace 'SVGElements' as a type
type NamesToAttr = {
  a: SVGElements.a
  animate: SVGElements.animate
  animateMotion: SVGElements.animateMotion
  animateTransform: SVGElements.animateTransform
  circle: SVGElements.circle
  clipPath: SVGElements.clipPath
  defs: SVGElements.defs
  desc: SVGElements.desc
  ellipse: SVGElements.ellipse
  feBlend: SVGElements.feBlend
  feColorMatrix: SVGElements.feColorMatrix
  feComponentTransfer: SVGElements.feComponentTransfer
  feComposite: SVGElements.feComposite
  feConvolveMatrix: SVGElements.feConvolveMatrix
  feDiffuseLighting: SVGElements.feDiffuseLighting
  feDisplacementMap: SVGElements.feDisplacementMap
  feDistantLight: SVGElements.feDistantLight
  feFlood: SVGElements.feFlood
  feFuncA: SVGElements.feFuncA
  feFuncB: SVGElements.feFuncB
  feFuncG: SVGElements.feFuncG
  feFuncR: SVGElements.feFuncR
  feGaussianBlur: SVGElements.feGaussianBlur
  feImage: SVGElements.feImage
  feMerge: SVGElements.feMerge
  feMergeNode: SVGElements.feMergeNode
  feMorphology: SVGElements.feMorphology
  feOffset: SVGElements.feOffset
  fePointLight: SVGElements.fePointLight
  feSpecularLighting: SVGElements.feSpecularLighting
  feSpotLight: SVGElements.feSpotLight
  feTile: SVGElements.feTile
  feTurbulence: SVGElements.feTurbulence
  filter: SVGElements.filter
  foreignObject: SVGElements.foreignObject
  g: SVGElements.g
  image: SVGElements.image
  line: SVGElements.line
  linearGradient: SVGElements.linearGradient
  marker: SVGElements.marker
  mask: SVGElements.mask
  metadata: SVGElements.metadata
  mpath: SVGElements.mpath
  path: SVGElements.path
  pattern: SVGElements.pattern
  polygon: SVGElements.polygon
  polyline: SVGElements.polyline
  radialGradient: SVGElements.radialGradient
  rect: SVGElements.rect
  script: SVGElements.script
  set: SVGElements.set
  stop: SVGElements.stop
  style: SVGElements.style
  svg: SVGElements.svg
  switch: SVGElements._switch
  symbol: SVGElements._symbol
  text: SVGElements.text
  textPath: SVGElements.textPath
  title: SVGElements.title
  tspan: SVGElements.tspan
  use: SVGElements.use
  view: SVGElements.view
} & { [a: string]: never }
type _Extensible<T> = [T] extends [never] ? & { [k: string]: string | number } : T & { [k: string]: string | number }
// TODO: 先从 SVGElements 类型转换为字符串，再从字符串映射为 AttrType，有没有办法直接使用类型映射到另一类型？SVGPathElement -> SVGElements.path
type SVGAttrType<T> = _Extensible<NamesToAttr[KeysMatching<globalThis.SVGElementTagNameMap, T>]>

type ValueFn<T extends BaseType, D, R> = (datum: D, index: number, groups: T[]) => R


/**
 * 同.attr函数参数，但是一次设置多个attr
 * @example
 * selection
 *   .each(setAttrs((data, index, group) => {
 *     return {
 *       x: index * 50,
 *       y: data.value
 *     }
 *   }))
 */
export function setAttrs<T extends BaseType, D>(fn: ValueFn<T, D, SVGAttrType<T>>) {
  return function (this: T, ...args: [D, number, any]) {
    const attrs = Reflect.apply(fn, this, args)
    for (const [name, v] of Object.entries(attrs)) {
      if (!(this instanceof Element)) return
      if (v === null || v === undefined) this.removeAttribute(name)
      else this.setAttribute(name, v + '')
    }
  }
}

// test setAttrs
// const q = setAttrs<SVGPathElement, number>((d, n, g) => ({ r: "" }))



// type D3DragEventType = 'start' | 'drag' | 'end'
// type D3DragEvent<T extends D3DragEventType, D> = {
//   active: number
//   dx: number
//   dy: number
//   x: number
//   y: number
//   identifier: string
//   type: T
//   target: Fn
//   subject: D
//   sourceEvent: MouseEvent
// }


type DragFn<T extends DraggedElementBaseType, D> = (this: T, event: D3DragEvent<T, D, D>, data: D, thisArg: T) => any


/**
 * 拖拽事件
 * @param onStart 开始事件
 * @param onDrag 拖拽事件
 * @param onEnd 结束事件
 * @example
 * selection.call(setDrag(
 *   nothing,
 *   (event, data, thisArg) => {
 *     d3.select(thisArg)
 *       .attr('x', event.x)
 *       .attr('y', event.y)
 *   },
 *   nothing
 * ))
 */
export function setDrag<T extends DraggedElementBaseType, D>(
  onStart: DragFn<T, D>,
  onDrag: DragFn<T, D>,
  onEnd: DragFn<T, D>,
) {
  return drag<T, D, D>()
    .on("start", function (e, d) { onStart.call(this, e, d, this) })
    .on("drag", function (e, d) { onDrag.call(this, e, d, this) })
    .on("end", function (e, d) { onEnd.call(this, e, d, this) })
}