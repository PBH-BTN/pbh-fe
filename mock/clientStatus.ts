import { MockMethod } from 'vite-plugin-mock'
import mockjs from 'mockjs'
const { Random } = mockjs

const ClientStatusMockAPi: MockMethod[] = [
  {
    url: '/api/clientStatus',
    method: 'get',
    response: () => {
      return Array.from({ length: 4 })
        .fill(0)
        .map(() => {
          return {
            name: 'qbittorrent',
            peers: 34,
            torrents: 5,
            endpoint: 'https://nas.gaojianli.me:8443/qbt/api/v2',
            status: 'HEALTHY'
          }
        })
    }
  }
]

export default ClientStatusMockAPi
