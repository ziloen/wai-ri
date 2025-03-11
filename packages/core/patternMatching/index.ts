import { isFn } from '@wai-ri/shared'

const FALLBACK_ARM = '_'

type GetMatchArmResults<
  Arms,
  Result = Arms[keyof Arms]
> = Result extends infer SubResult
  ? SubResult extends (...args: any) => infer Return
    ? Return
    : SubResult
  : never

/**
 * 模式匹配
 * {@link FALLBACK_ARM default 分支}
 * @example
 * ```ts
 * const value = "a" as unknown
 * 
 * //    ↓ 'a' | 'b' | 'c'
 * const result = patternMatching(value, {
 *   a: () => 'a',
 *   b: "b",
 *   _: "c"
 * })
 * ```
 */
export function patternMatching<
  K extends keyof any,
  const T extends Partial<Record<K | (keyof any & Record<never, never>), unknown>>
>(
  value: K,
  matchArms: T
): GetMatchArmResults<T> {
  const resultArm = Object.hasOwn(matchArms, value)
    ? matchArms[value]
    : matchArms[FALLBACK_ARM as K]

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return isFn(resultArm)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    ? resultArm()
    : resultArm as GetMatchArmResults<T>
}