# blockThread

阻塞 JS 线程

## 使用

```ts
const list = Array.from({ length: 10 })

// 模拟长耗时任务
// 阻塞 200ms
blockThread(200)
console.log(list)
```