# bindSelf

获得对象绑定后的方法

## 使用

```ts
import { bindSelf } from '@wai-ri/core'

// 一般情况
const some = new SomeClass()
const method = some.method.bind(some)

const entry = Object.entries(obj)
const iter = entry[Symbol.iterator].bind(entry)

// 减少一个临时变量
const method = bindSelf(new SomeClass(), 'method')
const iter = bindSelf(Object.entries(obj), Symbol.iterator)
```