# match

模式匹配

## 使用

```ts
import { match } from '@wai-ri/core'

const optionType = 'edit'

const result = match(optionType, {
  edit: () => /** edit */ {},
  remove: () => /** remove */ {},
  add: () => /** add option */ {},
  _: () => /** did not matched */ {}
})
```