import { ignoreReject } from '.'


describe('ignoreReject', () => {

  it('ignoreReject', () => {
    ignoreReject(Promise.reject(new Error('test')))
  })
})