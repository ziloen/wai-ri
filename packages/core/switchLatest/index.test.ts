import { Fn } from '@wai-ri/shared'
import { switchLatest } from '.'
import { sleep } from '../sleep'


describe('switchLatest', () => {
  it('返回新的函数', () => {
    const fetchData = async () => {
      return 1
    }

    const fetchData_switch = switchLatest(fetchData)

    expect(fetchData_switch).toBeTypeOf('function')
    assert(fetchData_switch !== fetchData)
  })

  it('切换到最新一次调用', async () => {
    let count = 0
    const promises: Fn[] = []

    async function fetchData() {
      return new Promise((res) => {
        promises.push(res)
      })
    }

    const fetchData_switch = switchLatest(fetchData)

    for (let i = 0; i <= 5; i++) {
      fetchData_switch()
        .then(() => count = i)
    }

    for (const promise of promises) {
      promise()
    }
    await sleep(0);
    expect(count).toBe(5)
  })
})