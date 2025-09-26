


export function mapAtIndex<K, V>(map: Map<K, V>, index: number): [K, V] | undefined {
  if (!Number.isInteger(index)) return

  if (index < 0) {
    index = map.size + index
  }

  if (index < 0 || index >= map.size) return

  let i = 0
  for (const entry of map.entries()) {
    if (i === index) return entry
    i++
  }
}

export function mapIndexOfKey<K, V>(map: Map<K, V>, key: K): number {
  let i = 0
  for (const k of map.keys()) {
    if (k === key) return i
    i++
  }
  return -1
}