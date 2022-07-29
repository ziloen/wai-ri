# setDrag

设置拖拽事件，可以使用箭头函数，this通过第三个参数传递

## 使用
```ts
import { setDrag } from '@wai-ri/d3'

const svg = d3.select('#mySvg')
const selection = svg.select('rect')

selection.call(setDrag(
  nothing,
  (event, data, thisArg) => {
    d3.select(thisArg)
      .attr('x', event.x)
      .attr('y', event.y)
  },
  nothing
))
```

