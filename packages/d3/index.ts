import { ObjectType, Fn, Extensible, ExpandDeep, Union } from '@wai-ri/shared'
import * as d3 from 'd3'
import type { Selection, BaseType } from 'd3'
import type { Attributes, SVGElements  } from '@lsegurado/htmltype'


type ValueFn<T extends BaseType, D, R> = (datum: D, index: number, groups: T[]) => R


type ElementMap<T> =
  T extends SVGAElement ? SVGElements.a :
  T extends SVGAnimateElement ? SVGElements.animate :
  T extends SVGAnimateMotionElement ? SVGElements.animateMotion :
  T extends SVGAnimateTransformElement ? SVGElements.animateTransform :
  T extends SVGCircleElement ? SVGElements.circle :
  T extends SVGClipPathElement ? SVGElements.clipPath :
  T extends SVGDefsElement ? SVGElements.defs :
  T extends SVGDescElement ? SVGElements.desc :
  T extends SVGEllipseElement ? SVGElements.ellipse :
  T extends SVGFEBlendElement ? SVGElements.feBlend :
  T extends SVGFEColorMatrixElement ? SVGElements.feColorMatrix :
  T extends SVGFEComponentTransferElement ? SVGElements.feComponentTransfer :
  T extends SVGFECompositeElement ? SVGElements.feComposite :
  T extends SVGFEConvolveMatrixElement ? SVGElements.feConvolveMatrix :
  T extends SVGFEDiffuseLightingElement ? SVGElements.feDiffuseLighting :
  T extends SVGFEDisplacementMapElement ? SVGElements.feDisplacementMap :
  T extends SVGFEDistantLightElement ? SVGElements.feDistantLight :
  T extends SVGFEFloodElement ? SVGElements.feFlood :
  T extends SVGFEFuncAElement ? SVGElements.feFuncA :
  T extends SVGFEFuncBElement ? SVGElements.feFuncB :
  T extends SVGFEFuncGElement ? SVGElements.feFuncG :
  T extends SVGFEFuncRElement ? SVGElements.feFuncR :
  T extends SVGFEGaussianBlurElement ? SVGElements.feGaussianBlur :
  T extends SVGFEImageElement ? SVGElements.feImage :
  T extends SVGFEMergeElement ? SVGElements.feMerge :
  T extends SVGFEMergeNodeElement ? SVGElements.feMergeNode :
  T extends SVGFEMorphologyElement ? SVGElements.feMorphology :
  T extends SVGFEOffsetElement ? SVGElements.feOffset :
  T extends SVGFEPointLightElement ? SVGElements.fePointLight :
  T extends SVGFESpecularLightingElement ? SVGElements.feSpecularLighting :
  T extends SVGFESpotLightElement ? SVGElements.feSpotLight :
  T extends SVGFETileElement ? SVGElements.feTile :
  T extends SVGFETurbulenceElement ? SVGElements.feTurbulence :
  T extends SVGFilterElement ? SVGElements.filter :
  T extends SVGForeignObjectElement ? SVGElements.foreignObject :
  T extends SVGGElement ? SVGElements.g :
  T extends SVGImageElement ? SVGElements.image :
  T extends SVGLinearGradientElement ? SVGElements.linearGradient :
  T extends SVGMarkerElement ? SVGElements.marker :
  T extends SVGMaskElement ? SVGElements.mask :
  T extends SVGMetadataElement ? SVGElements.metadata :
  T extends SVGMPathElement ? SVGElements.mpath :
  T extends SVGPathElement ? SVGElements.path :
  T extends SVGPatternElement ? SVGElements.pattern :
  T extends SVGPolygonElement ? SVGElements.polygon :
  T extends SVGPolylineElement ? SVGElements.polyline :
  T extends SVGRadialGradientElement ? SVGElements.radialGradient :
  T extends SVGRectElement ? SVGElements.rect :
  T extends SVGScriptElement ? SVGElements.script :
  T extends SVGSetElement ? SVGElements.set :
  T extends SVGStopElement ? SVGElements.stop :
  T extends SVGStyleElement ? SVGElements.style :
  T extends SVGSVGElement ? SVGElements.svg :
  T extends SVGSwitchElement ? SVGElements._switch :
  T extends SVGSymbolElement ? SVGElements._symbol :
  T extends SVGTextElement ? SVGElements.text :
  T extends SVGTextPathElement ? SVGElements.textPath :
  T extends SVGTitleElement ? SVGElements.title :
  T extends SVGTSpanElement ? SVGElements.tspan :
  T extends SVGUseElement ? SVGElements.use :
  T extends SVGViewElement ? SVGElements.view :
  ObjectType

type _Extensible<T> = T & { [k: string]: string | number }


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
export function setAttrs<T extends BaseType, D>(fn: ValueFn<T, D, _Extensible<ElementMap<T>>>) {
  return function (this: T, ...args: [D, number, any]) {

    const attrs = Reflect.apply(fn, this, args)
    for (const [name, v] of Object.entries(attrs)) {
      if (!(this instanceof Element)) return

      if (v === null || v === undefined) this.removeAttribute(name)
      else this.setAttribute(name, v + '')
    }
  }
}

const data = [{value: 12}]

d3.select('#mySvg')
.each(setAttrs(() => ({
  height: window.innerHeight,
  width: window.innerWidth
})))
.selectAll('circle')
.data(data, (data: any) => data.id)
.join('circle')
.each(setAttrs((data, index, group) => ({
  cx: data.value * 10,
  cy: data.value * 10,
  r: 20,
  fill: 'white',
  // stroke: 'red',
  'stroke-width': 2,
  stroke: ''
})))

type D3DragEventType = 'start' | 'drag' | 'end'
type D3DragEvent<T extends D3DragEventType, D> = {
  active: number
  dx: number
  dy: number
  x: number
  y: number
  identifier: string
  type: T
  target: Fn
  subject: D
  sourceEvent: MouseEvent
}


type DragFn<E extends D3DragEventType, T, D> = (this: T, event: D3DragEvent<E, D>, data: D, thisArg: T) => any


/**
 * 拖拽事件
 * @param start 开始事件
 * @param drag 拖拽事件
 * @param end 结束事件
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
export function setDrag<T extends Element, D>(
  start: DragFn<'start', T, D>,
  drag: DragFn<'drag', T, D>,
  end: DragFn<'end', T, D>,
) {
  return d3.drag<T, D>()
    .on("start", function (e, d) { start.call(this, e, d, this) })
    .on("drag", function (e, d) { drag.call(this, e, d, this) })
    .on("end", function (e, d) { end.call(this, e, d, this) })
}