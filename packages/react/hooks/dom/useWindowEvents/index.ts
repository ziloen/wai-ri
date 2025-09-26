import { useLatest } from '@wai-ri/react'
import { useEffect } from 'react'
import type { Observable } from 'rxjs'
import { fromEvent } from 'rxjs'
import { map, share } from 'rxjs/operators'

type EventHook<V> = (fn: (value: V) => unknown) => void


/** 创建订阅 hook，卸载时自动取消订阅 */
/*#__NO_SIDE_EFFECTS__*/
function craeteSubscribeHook<V>(observerable: Observable<V>): EventHook<V> {
  return function (fn) {
    const fnRef = useLatest(fn)
    useEffect(() => {
      const subscription = observerable.subscribe((v) => fnRef.current(v))
      return () => subscription.unsubscribe()
    }, [])
  }
}


/** window 按键抬起事件 */
export const useWindowKeyDown: EventHook<KeyboardEvent> = /* #__PURE__ */craeteSubscribeHook(
  /* #__PURE__ */ fromEvent<KeyboardEvent>(window, 'keydown', { passive: true })
    .pipe(/* #__PURE__ */share({ resetOnRefCountZero: true }))
)


/** window 按键抬起事件 */
export const useWindowKeyup: EventHook<KeyboardEvent> =/* #__PURE__ */ craeteSubscribeHook(
  /* #__PURE__ */fromEvent<KeyboardEvent>(window, 'keyup', { passive: true })
    .pipe(/* #__PURE__ */share({ resetOnRefCountZero: true }))
)

/** window 滚动监听 */
export const useWindowScroll: EventHook<Event> = craeteSubscribeHook(
  /* #__PURE__ */ fromEvent(window, 'scroll', { passive: true })
    .pipe(/* #__PURE__ */share({ resetOnRefCountZero: true }))
)

/** window 尺寸调整监听 */
export const useWindowResize: EventHook<UIEvent> = craeteSubscribeHook(
  /* #__PURE__ */ fromEvent<UIEvent>(window, 'resize', { passive: true })
    .pipe(/* #__PURE__ */ share({ resetOnRefCountZero: true }))
)

// 🚧，FIXME: 怎么给 MessageEvent 添加泛型？
const useWindowMessage =/* #__PURE__ */ craeteSubscribeHook(
  /* #__PURE__ */ fromEvent<MessageEvent>(window, 'message', { passive: true })
    .pipe(/* #__PURE__ */share({ resetOnRefCountZero: true }))
)

// 🚧
const useWindowPointer = /* #__PURE__ */craeteSubscribeHook(
  /* #__PURE__ */ fromEvent(window, 'pointermove', { passive: true, capture: true })
    .pipe(/* #__PURE__ */ share({ resetOnRefCountZero: true }))
)

/** 页面可见性改变事件流 */
const visibilityChange$ = /* #__PURE__ */fromEvent(document, 'visibilitychange', {
  passive: true
}).pipe(
  /* #__PURE__ */ share({ resetOnRefCountZero: true }),
  /* #__PURE__ */map(() => document.visibilityState !== 'hidden')
)

/** 页面可见性监听 */
export const useVisibleChange: EventHook<boolean> = /* #__PURE__ */craeteSubscribeHook(visibilityChange$)

/** 监听设备像素比变化 */
export function useDevicePixelRatioChange(fn: (dpr: number) => void): void {
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
