import type { D3DragEvent, DraggedElementBaseType } from 'd3'
import { drag } from 'd3'

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
  onEnd: DragFn<T, D>
) {
  return drag<T, D, D>()
    .on('start', function (e, d) { onStart.call(this, e, d, this) })
    .on('drag', function (e, d) { onDrag.call(this, e, d, this) })
    .on('end', function (e, d) { onEnd.call(this, e, d, this) })
}