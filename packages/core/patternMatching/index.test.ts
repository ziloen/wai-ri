import { patternMatching } from '.'

describe('match', () => {

  it('match arm', () => {
    const val = 12

    const result = patternMatching(val, {
      9: '不是999',
      10: '也许是10',
      11: '应该是11',
      12: '可能是12',
      _: '无匹配'
    })

    expect(result).toBe('可能是12')
  })

  it('not match use _', () => {
    const val = 12

    const result = patternMatching(val, {
      7: '777',
      8: '888',
      9: '999',
      _: '无匹配项'
    })

    expect(result).toBe('无匹配项')
  })

  it('run match function', () => {
    const val = 12 as 12 | 9
    const errVal = 9

    const result = patternMatching(val, {
      12: () => '计算结果',
      _: () => '默认结果'
    })

    const errResult = patternMatching(errVal, {
      12: () => '计算结果',
      _: () => '默认结果',
      9: () => 12
    })

    expect(result).toBe('计算结果')
    expect(errResult).toBe('默认结果')

    assertType<'计算结果' | '默认结果'>(result)
    assertType<'计算结果' | '默认结果' | 12>(errResult)
  })
})