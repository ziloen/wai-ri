import type { Equal, Expand } from '.'
import type { Expect } from './_internal'


describe('Expand', () => {
  it('展开对象', () => {
    type A = { a?: string }
    type B = { readonly b: number }
    interface C extends A, B { c: boolean }
    // 检查 T 的类型是否与下面相同
    type T = Expand<C>
    type R = Expect<Equal<T, {
      a?: string
      readonly b: number
      c: boolean
    }>>
  })

  it('不展开Promise', () => {
    type A = Promise<Promise<string>>
    type B = Promise<A>
    type C = A | B
    // 检查 T 的类型是否与下面相同
    type T = Expand<C>
    type R = Expect<Equal<T,
    Promise<Promise<string>> | Promise<Promise<Promise<string>>>
    >>
  })

  it('展开函数参数和返回', () => {
    type A = { a?: string }
    type B = { readonly b: number }
    interface C extends A, B { c: boolean }
    type F = (a: C) => B
    // 检查 T 的类型是否与下面相同
    type T = Expand<F>
    type R = Expect<Equal<T,
      (a: {
        c: boolean
        a?: string
        readonly b: number
      }) => {
        readonly b: number
      }
    >>
  })


})