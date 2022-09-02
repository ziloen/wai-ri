# nothing

空函数，`() => {}`的替代品

## 使用

```ts
import { nothing } from '@wai-ri/core'

async function someFn() {
  // ...
}

someFn()
  .then(/*  */)
  // .catch(() => {})
  .catch(nothing)
```