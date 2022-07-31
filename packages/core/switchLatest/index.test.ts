import { switchLatest } from '.'


describe('switchLatest', () => {
  it('返回新的函数', () => {
    const fetchData = async () => {
      return 1
    }

    const fetchData_switch = switchLatest(fetchData)

    expect(fetchData_switch).toBeTypeOf('function')
    assert(fetchData_switch !== fetchData)
  })

  it.todo('切换到最新一次调用', async () => {
    // 要怎么测试异步代码？
    async function fetchData() {
      return new Promise((res) => {
        setTimeout(() => {
          res(54)
        }, 100)
      })
    }

    const fetchData_switch = fetchData
  })
})