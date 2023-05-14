import { useLatest } from '@wai-ri/react'
import { useEffect } from 'react'
import { fromEvent, Observable } from 'rxjs'
import { map, share } from 'rxjs/operators'


/** 创建订阅 hook，卸载时自动取消订阅 */
function craeteSubscribeHook<V>(observerable: Observable<V>) {
  return function (fn: (value: V) => void) {
    const fnRef = useLatest(fn)
    useEffect(() => {
      const subscription = observerable.subscribe(v => fnRef.current(v))
      return () => subscription.unsubscribe()
    }, [])
  }
}


/** window 按键抬起事件 */
export const useWindowKeyDown = craeteSubscribeHook(
  fromEvent<KeyboardEvent>(window, 'keydown', {
    passive: true
  }).pipe(share({ resetOnRefCountZero: true }))
)


/** window 按键抬起事件 */
export const useWindowKeyup = craeteSubscribeHook(
  fromEvent<KeyboardEvent>(window, 'keyup', {
    passive: true
  }).pipe(share({ resetOnRefCountZero: true }))
)

/** window 滚动监听 */
export const useWindowScroll = craeteSubscribeHook(
  fromEvent(window, 'scroll', { passive: true }).pipe(
    share({ resetOnRefCountZero: true })
  )
)

/** window 尺寸调整监听 */
export const useWindowResize = craeteSubscribeHook(
  fromEvent<UIEvent>(window, 'resize', { passive: true }).pipe(
    share({ resetOnRefCountZero: true })
  )
)

// 🚧，FIXME: 怎么给 MessageEvent 添加泛型？
const useWindowMessage = craeteSubscribeHook(
  fromEvent<MessageEvent>(window, 'message', { passive: true }).pipe(
    share({ resetOnRefCountZero: true })
  )
)

// 🚧
const useWindowPointer = craeteSubscribeHook(
  fromEvent(window, 'pointermove', { passive: true, capture: true })
    .pipe(
      share({ resetOnRefCountZero: true })
    )
)

/** 页面可见性改变事件流 */
const visibilityChange$ = fromEvent(document, 'visibilitychange', {
  passive: true
}).pipe(
  share({ resetOnRefCountZero: true }),
  map(() => document.visibilityState !== 'hidden')
)

/** 页面可见性监听 */
export const useVisibleChange = craeteSubscribeHook(visibilityChange$)

/** 监听设备像素比变化 */
export function useDevicePixelRatioChange(fn: (dpr: number) => void) {
  const fnRef = useLatest(fn)
  useEffect(() => {
    const ac = new AbortController
    function update() {
      matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`
      ).addEventListener(
        'change',
        () => (fnRef.current(window.devicePixelRatio), update()),
        { once: true, signal: ac.signal }
      )
    }
    update()
    return () => ac.abort()
  }, [])
}

// 另一种实现，监听 window resize 事件，映射为像素比，并过滤重复事件
// /** 设备像素比变化事件流 */
// const devicePixelRatioChange$ = fromEvent<UIEvent>(window, "resize", {
//   passive: true
// })
//   .pipe(share({ resetOnRefCountZero: true }))
//   .pipe(
//     // 映射为 设备像素比
//     map(() => window.devicePixelRatio),
//     // 忽略直到变化前
//     distinctUntilChanged()
//   );
// /** 设备像素比变化监听 */
// export const useDevicePixelRatioChange = craeteSubscribeHook(
//   devicePixelRatioChange$.pipe(share({ resetOnRefCountZero: true }))
// );
