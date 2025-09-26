// 🚧🚧🚧🚧🚧🚧🚧🚧
// 施工中
// 🚧🚧🚧🚧🚧🚧🚧🚧


/**
 * 将数组转换成正则表达式形式
 * ```ts
 * const keywords = ['center', 'align', 'justify']
 * const matchRegExp = taggedRegExp`^flex-(${keywords})$` // => `^flex-(center|align|justify)$`
 * ```
 * 已知问题：
 * 在没有表达式的字符上使用会报错 taggedRegExp`123`
 *
 * 功能：
 * 支持Object？ Objec.keys()？
 * 支持[abc]语法？taggedRegExp`^flex-[${keywords}]$` => ... // 即前后为[]且不为 \[ \]
 * 支持 (?<= )  (?= ) 等等
 */
export function taggedRegExp(literals: TemplateStringsArray, expressions: readonly unknown[]): string {
  let result: string = expressions.reduce<string>((pre, express, i) => {
    const literal = literals[i]
    const expressString = Array.isArray(express) ? express.join('|') : String(express)
    return pre + literal + expressString
  }, '')
  result += literals.at(-1)!
  return result
}