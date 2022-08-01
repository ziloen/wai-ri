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
})