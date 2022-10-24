// 🚧🚧🚧🚧🚧🚧🚧🚧
// 施工中
// 🚧🚧🚧🚧🚧🚧🚧🚧


/**
 * 将数组转换成正则表达式形式
 * ```ts
 * const keywords = ['center', 'align', 'justify']
 * const matchRegExp = taggedRegExp`^flex-(${keywords})$` // => `^flex-(center|align|justify)$`
 * ```
 * @param literals
 * @param expressions
 * @returns
 */
export function taggedRegExp(literals: TemplateStringsArray, expressions: readonly unknown[]) {
  let result: string = expressions.reduce<string>((pre, express, i) => {
    const literal = literals[i]
    const expressString = Array.isArray(express) ? express.join('|') : String(express)
    return pre + literal + expressString
  }, '')
  result += literals.at(-1)
  return result
}