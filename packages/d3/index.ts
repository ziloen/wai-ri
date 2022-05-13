import type { ObjectType, Fn } from '@wai-ri/shared'
import * as d3 from 'd3'
import type { Selection } from 'd3'


type ValueFn<T extends Element, D, R> = (datum: D, index: number, groups: T[]) => R


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
export function setAttrs<T extends Element, D>(fn: ValueFn<T, D, ObjectType<string, number | string>>) {
  return function (this: T, ...args: [D, number, any]) {

    const attrs = Reflect.apply(fn, this, args)
    for (const [name, v] of Object.entries(attrs)) {
      if (v === null) this.removeAttribute(name)
      else this.setAttribute(name, v + '')
    }
  }
}


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