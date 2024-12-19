import { escapeRegExp } from '.'


describe('escapeRegExp', () => {
  it('(|) ', () => {
    const customReg = '(|)'
    const escaped = customReg.split('').map(escapeRegExp)

    expect(escaped).toMatchInlineSnapshot(`
      [
        "\\\\(",
        "\\\\|",
        "\\\\)",
      ]
    `)

    const reg = new RegExp(`(${escaped.join('|')})`)

    expect(reg).toMatchInlineSnapshot(String.raw`/\(\\\(\|\\\|\|\\\)\)/`)

    const has = ['(', '.)', 'sss|dddd']
    const not = ['ooo', '[]', 'ddd']

    const testHas = has.every((v) => reg.test(v))
    const testNot = not.every((v) => !reg.test(v))

    expect(testHas).toBe(true)
    expect(testNot).toBe(true)
  })
})