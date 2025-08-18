

/**
 * 解析字符长度，忽略字符序列
 */
export function unicodeLength(str: string) {
  const segment = (new Intl.Segmenter).segment(str)
  return Array.from(segment).length
}