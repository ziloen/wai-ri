# ignoreReject

忽略 Promise 失败的情况，用于忽略某一步失败，使错误不传递下去

## 使用

```ts
import { ignoreReject, nothing } from '@wai-ri/core'

async function submitForm() {
  // ... 
}

// 使用前，为了使 catch 只处理 submitForm 的 reject，需要套一层娃
asyncValidateForm()
  .then(() => {
    submitForm()
      .then(/* 成功 */)
      .catch(/* 错误 */)
  })
  // .catch(nothing)

// 使用后，catch 只处理 submitForm
ignoreReject(asyncValidateForm())
  .then(submitForm)
  .then(/* 成功 */)
  .catch(/* 错误 */)
```