import { Request } from '../config'

export const ChartUserApi = {
  async add() {
    const params = {
      account: '123456',
      password: '123456',
      username: 'root',
    }
    const req = await Request.post('/user/add', params)

    console.log(req)
  },
  async login() {
    const params = {}
  },
}
