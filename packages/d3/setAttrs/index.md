# setAttrs

同.attr函数参数，但是一次设置多个attr，同时提供TS类型自动补全

## 使用
```ts
import { setAttrs } from '@wai-ri/d3'

const svg = d3.select('#mySvg')
const selection = svg.select('rect')

selection
  .each(setAttrs((data, index, group) => ({
    x: index * 50,
    y: data.value
  })))
```

