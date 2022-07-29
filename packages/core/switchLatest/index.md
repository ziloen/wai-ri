# switchLatest

参考`RxJS`的[`switchAll`](https://rxjs.dev/api/index/function/switchAll)

## 使用

```ts
import { ignoreReject, nothing } from '@wai-ri/core'

async function submitForm() {
  // ... 
}

// 使用前
asyncValidateForm()
  .then(() => {
    // 为了使 catch 只处理 submitForm 的 reject，需要套一层娃
    submitForm()
      .then(/* 成功 */)
      .catch(/* 错误 */)
  })
  .catch(nothing)

// 使用后
ignoreReject(asyncValidateForm())
  .then(submitForm)
  .then(/* 成功 */)
  .catch(/* 错误 */)
```