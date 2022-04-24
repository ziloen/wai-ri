/** 去除多余的空格（首尾空格去除，中间空格合并） */
export function trimString(val: string) {
  return val.trim().replaceAll(/\s{2,}/g, ' ')
}
