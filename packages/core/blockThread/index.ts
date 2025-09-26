
/**
 * 阻塞 JS 线程
 * @param ms 阻塞时长
 * ```ts
 * // 模拟 cpu 长耗时任务
 * blockThread(200)
 * ```
 */
export function blockThread(ms = 1000): void {
  const start = performance.now()
  while (performance.now() - start < ms);
}