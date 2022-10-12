

const FALLBACK_ARM = '_'

type MatchArm = {
  [key: keyof any]: any
}

/**
 * 模式匹配
 * {@link FALLBACK_ARM default 分支}
 */
export function patternMatching<T extends keyof any>(value: T, matchArms: MatchArm) {
  const resultArm = value in matchArms ? matchArms[value] : matchArms[FALLBACK_ARM]
  return typeof resultArm === 'function' ? resultArm() : resultArm
}