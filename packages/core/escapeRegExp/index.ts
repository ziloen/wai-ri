
/** 转换将要用于正则的字符串，如 | ? 等 */
export function escapeRegExp(str: string) {
  return str
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d')
}

