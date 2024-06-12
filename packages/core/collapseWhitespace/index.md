# trimString

去除字符串首尾空格，合并中间空格

## 使用

```ts
import { trimString } from '@wai-ri/core'

const strBefore = "  A    B. C "

// "A B. C"
const strAfter = trimString(strBefore)
```