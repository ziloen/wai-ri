# bindAll

绑定对象上所有函数为对象本身

> ⚠ 此函数会修改原对象

## 使用

```ts
import p5 from 'p5'
import { bindAll } from '@wai-ri/core'

const instance = new p5((sketch: p5) => {
  bindAll(sketch)
  const { line, stroke, fill, createCanvas } = sketch

  sketch.setup = () => {
    createCanvas(container_width, height)
    sketch.smooth()
    sketch.strokeCap(sketch.SQUARE)
  }

  sketch.draw = () => {
    line(/* */)
  }
})
```