import { bindSelf } from '.'


describe('bindSelf', () => {
  it('绑定单个', () => {
    const a = {
      f1() {
        this.val += 1
      },
      f2() {
        this.val -= 1
      },
      val: 0
    }

    const inc = bindSelf(a, 'f1')
    const { f1 } = a
    inc()
    expect(a.val).toBe(1)
    f1()
    expect(a.val).toBe(2)
  })

  it('绑定多个', () => {
    const a = {
      f1() {
        this.val += 1
      },
      f2() {
        this.val -= 1
      },
      val: 0
    }

    const self = bindSelf(a, ['f1', 'f2'])
    expect(a === self).toBe(true)
    const { f1, f2 } = a

    f1()
    expect(self.val).toBe(1)
  })
})