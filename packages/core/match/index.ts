


type MatchArm = {
  [key: keyof any]: () => any
  // _ : () => any
}

/** 模式匹配 */
export function match<T>(value: T, matchArms: MatchArm) {
  const matched = matchArms[value as keyof MatchArm] ?? matchArms['_']
  return matched()
}