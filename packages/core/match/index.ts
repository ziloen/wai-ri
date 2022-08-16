


type MatchArm = {
  [key: keyof any]: () => any
  // _ : () => any
}

export function match<T>(value: T, matchArms: MatchArm) {
  const matched = matchArms[value as keyof MatchArm] ?? matchArms['_']
  return matched()
}