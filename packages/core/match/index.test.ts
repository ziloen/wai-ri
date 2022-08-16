import { match } from '.'

describe('match', () => {

  it('match arm', () => {
    const val = 12
    
    const result = match(val, {
      9: () => '不是999',
      10: () => '也许是10',
      11: () => '应该是11',
      12: () => '可能是12',
      _: () => '无匹配'
    })

    expect(result).toBe('可能是12')
  })

  it('not match use _', () => {
    const val = 12

    const result = match(val, {
      7: () => '777',
      8: () => '888',
      9: () => '999',
      _: () => '无匹配项'
    })

    expect(result).toBe('无匹配项')  
  }) 
})