
/**
 * 阻塞 JS 线程
 * @param ms
 */
export function blockThread(ms = 1000) {
  const start = performance.now()
  while (performance.now() - start < ms);
}