import { useEnum } from '.'


describe('useEnum', () => {

  it('双向绑定', () => {
    const e = useEnum({ a: 12, b: '9', c: false, d: undefined, e: null })
    expect(e.a).toBe(12)
    expect(e[12]).toBe('a')

    expect(e.b).toBe('9')
    expect(e[9]).toBe('b')

    expect(e.c).toBe(false)
    expect(e.false).toBe('c')

    expect(e.d).toBe(undefined)
    expect(e.undefined).toBe('d')

    expect(e.e).toBe(null)
    expect(e.null).toBe('e')
  })

  it('for..of循环', () => {
    const e = useEnum({ a: 12, b: '9', c: false, d: undefined, e: null })
    const keys = []
    const vals = []
    for (const [key, val] of e) {
      keys.push(key)
      vals.push(val)
    }

    expect(keys.length).toBe(5)
  })

  it('for..of 不受源对象影响', () => {
    const a = { a: 12, b: '9', c: false, d: undefined, e: null }
    const e = useEnum(a)

    a.a = 21
    for (const [key, val] of e) {
      expect(e[key]).toBe(val)
    }
  })
})