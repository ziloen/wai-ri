import { backward } from '.'

describe('backward', () => {
  it('backward', () => {
    const array = [1, 2, 3]
    const result = []
    for (const item of backward(array)) {
      result.push(item)
    }
    expect(result).toEqual([3, 2, 1])
  })

  it('break should word', () => {
    const array = [1, 2, 3]
    const result = []
    for (const item of backward(array)) {
      result.push(item)
      break
    }
    expect(result).toEqual([3])
  })
})