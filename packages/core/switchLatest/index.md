# switchLatest

参考`RxJS`的[`switchAll`](https://rxjs.dev/api/index/function/switchAll)

只有最后一次生效，防止因网络延迟或快速点击等情况后发起的请求覆盖前面的请求，或者产生无效的 resolve（响应后渲染页面，但立刻被后面的响应打断，前一次渲染就会一闪而过）

## 使用

```ts
import { switchLatest } from '@wai-ri/core'

async function loadPage(id: string) {
  // ... 异步请求
}

const loadPage_switch = switchLatest(loadPage)

const listItem = document.getElementsByClassName('list-item')

listItem.forEach(el => {
  el.addEventListener('click', e => {
    loadPage_switch(e.target.id)
      .then(/*  */)
      .catch(/*  */)
  })
})
```