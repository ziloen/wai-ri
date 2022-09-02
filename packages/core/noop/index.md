# noop

更语义化的空函数，`() => {}`的替代品

## 使用

```ts
import { noop } from '@wai-ri/core'

async function someFn() {
  // ...
}

someFn()
  .then(/*  */)
  // .catch(() => {})
  .catch(noop)
```