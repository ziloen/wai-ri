# asyncDebounce

用于异步函数的debounce 

## 使用

```ts
import { asyncDebounce } from '@wai-ri/core'

async function loadData(id: number) {
  // ... 异步操作
}

const loadData_debounced = asyncDebounce(loadData, 120/* ms */, { maxWait: 2000/* ms */ })

const btn = document.getElementById("btn")

btn.addEventListener("click", () => {
  const id = 1
  loadData_debounced(id)
    .then(/* loadData 成功 */)
    .catch(/* loadData 失败 */)
  // 被 debounce 忽略的 Promise 不会 reject 也不会 resolve
})
```