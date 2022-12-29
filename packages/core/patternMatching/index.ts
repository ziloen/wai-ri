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
 */
export function patternMatching<
  V,
  K extends keyof any,
  T extends Partial<Record<keyof any, V>>
>(
  value: K,
  matchArms: T
): GetMatchArmResults<T> {
  const resultArm = value in matchArms ? matchArms[value] : matchArms[FALLBACK_ARM as K]
  return (typeof resultArm === 'function' ? resultArm() : resultArm) as GetMatchArmResults<T>
}