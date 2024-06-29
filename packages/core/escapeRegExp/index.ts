/** 转义正则字符，如 `|` `?` 等 */
export function escapeRegExp(str: string) {
  return str
    .replaceAll(/[|\\{}()[\]^$+*?.]/g, String.raw`\$&`)
    .replaceAll(/-/g, String.raw`\x2d`)
}

