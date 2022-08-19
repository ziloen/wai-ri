

const FALLBACK_ARM = '_'

type MatchArm = {
  [key: keyof any]: () => any
}

/** 
 * 模式匹配  
 * {@link FALLBACK_ARM default 分支}
 */
export function match<T>(value: T, matchArms: MatchArm) {
  const resultFn = matchArms[value as keyof MatchArm] ?? matchArms[FALLBACK_ARM]
  return resultFn()
}