# escapeRegExp

转义正则关键字，如`*`、`|`等，用于根据用户输入生成正则

## 使用

```ts
import { escapeRegExp } from '@wai-ri/core'

const matchArr = "\\|?.*".split('')

const reg = new RegExp(`(?:${matchArr.map(escapeRegExp).join('|')})`, 'g')
```