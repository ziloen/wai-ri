# sleep

休眠

## 使用

```ts
import { sleep } from '@wai-ri/core'

async function someFn(id: number) {
  // ...
}


async function main() {
  // 直接使用
  await sleep(200)

  // 延迟调用
  sleep(200, someFn, 12)
}
```