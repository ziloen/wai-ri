import { trimString } from '.'

describe('trimString', () => {
  it('去除首尾空格', () => {
    const org = '    string dasd  '
    expect(trimString(org)).toBe('string dasd')
  })

  it('合并中间空格', () => {
    const org = '  Str   ing, and  S'
    expect(trimString(org)).toBe('Str ing, and S')
  })
})