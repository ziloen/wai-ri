/** 延迟执行 */
export function sleep<F extends (...orgArg: unknown[]) => any>(ms?: number, func?: F, ...args: Parameters<F>): Promise<ReturnType<F>> {
  return new Promise(resolve => setTimeout(() => { resolve(func?.(...args)) }, ms))
}