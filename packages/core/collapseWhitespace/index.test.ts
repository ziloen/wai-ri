import { collapseWhitespace } from '.'

describe('trimString', () => {
  it('去除首尾空格', () => {
    const org = '    string dasd  '
    expect(collapseWhitespace(org)).toBe('string dasd')
  })

  it('合并中间空格', () => {
    const org = '  Str   ing, and  S'
    expect(collapseWhitespace(org)).toBe('Str ing, and S')
  })
})