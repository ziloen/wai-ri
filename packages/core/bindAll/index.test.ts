import { bindAll } from '.'

describe('bindAll', () => {
  it('绑定', () => {
    const org = { x: 12 }
    const next = Object.create(org)

    const target = Object.create(next)
    target.getX = function () {
      return this.x
    }

    bindAll(target)

    const { getX } = target
    expect(getX()).toBe(12)
  })

  it('绑定不可枚举', () => {
    const org = { x: 12 }
    const next = Object.create(org)
    const target = Object.create(next)

    Reflect.defineProperty(target, 'getX', {
      enumerable: false,
      writable: true,
      value() {
        return this.x
      }
    })

    Reflect.defineProperty(next, 'getA', {
      enumerable: false,
      value() {
        return this.x
      }
    })


    bindAll(target)
    const { getX, getA } = target
  })
})