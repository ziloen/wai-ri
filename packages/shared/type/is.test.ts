import { isKeyof } from './is'


describe('test', () => {

  it('shold narrow object type', () => {
    const a: { a: number } | { b: string } = {} as any
    if (isKeyof(a, 'a')) {
      a.a = 0
    } else {
      // @ts-expect-error 如果类型缩小成功应该报错
      a.a = 12
    }
  })
})