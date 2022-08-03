# useRxios

结合`RxJS`和`Axios`，意在使用`RxJS`时取消订阅时调用axios取消功能

## 使用

```ts
// 请求实例 request.ts
import AxiosStatic from 'axios'
import { useRxios } from '@wai-ri/rxios'


export const request = AxiosStatic.create({
  timeout: 2000,
  baseUrl: "http://localhost:443/",
  // ...
})

export const rxios = useRxios(request)

// config axios ...


// 使用 index.vue
import { rxios } from './request'
import { switchMap, Subject } from 'rxjs'

const req$ = new Subject()

req$.pipe(
  switchMap(() => 
    rxios({
      method: 'get',
      url: '/message/page',
      params: {
        isRead: 0,
        pageNumber: 1,
        pageSize: 10
      }
    }).pipe(
      catchError(() => EMPTY),
    )
  ),
  map(res => {
    // ..
  })
)
```