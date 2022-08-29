# patternMatching

模式匹配

## 使用

```ts
import { patternMatching } from '@wai-ri/core'

const optionType = 'edit'

const result = patternMatching(optionType, {
  edit: () => /** edit */ {},
  remove: () => /** remove */ {},
  add: () => /** add option */ {},
  _: () => /** did not matched */ {}
})
```