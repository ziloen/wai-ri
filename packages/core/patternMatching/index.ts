

const FALLBACK_ARM = '_'

type MatchArm = Record<keyof any, any>

/**
 * 模式匹配
 * {@link FALLBACK_ARM default 分支}
 */
export function patternMatching<
  T extends MatchArm,
  K extends keyof any
>(
  value: K,
  matchArms: T
): T[K] extends () => infer R ? R : T[K] {
  const resultArm = value in matchArms ? matchArms[value] : matchArms[FALLBACK_ARM]
  return typeof resultArm === 'function' ? resultArm() : resultArm
}