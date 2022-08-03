import { getAllKeys } from '.'

describe('getKeys', () => {
  it('原型', () => {
    const org = { x: 12, c: 72 }
    const next = Object.create(org)
    next.c = 99
    const target = Object.create(next)
    target.n = 49

    const keys = getAllKeys(target);

    expect(keys.length).toBe(3)
  })

  it('包括不可枚举', () => {
    const org = { x: 12, c: 72 }
    const next = Object.create(org)

    Reflect.defineProperty(next, 'q', {
      enumerable: false,
      value: 8
    })

    const target = Object.create(next)
    target.n = 49

    const keys = getAllKeys(target);
    
    
    expect(keys).toMatchInlineSnapshot(`
      [
        "n",
        "q",
        "x",
        "c",
      ]
    `)
  })
})