import { MockMethod } from 'vite-plugin-mock'
import mockjs from 'mockjs'
const { Random } = mockjs

const banlogsMockAPI: MockMethod[] = [
  {
    url: '/api/banlogs',
    method: 'get',
    response: (req) => {
      return {
        pageIndex: Number(req.query.pageIndex) || 0,
        pageSize: Number(req.query.pageSize) || 100,
        results: Array.from({ length: 4 })
          .fill(0)
          .map(() => {
            return {
              banAt: Number(Random.datetime('T')),
              unbanAt: Number(Random.datetime('T')),
              peerIp: Random.ip(),
              peerPort: Random.natural(1024, 65535),
              peerId: Random.string(10),
              peerClientName: Random.string(20),
              peerUploaded: Random.natural(0, 1000000),
              peerDownloaded: Random.natural(0, 1000000),
              peerProgress: Random.float(0, 1),
              torrentInfoHash: Random.guid().replace(/-/g, ''),
              torrentName: Random.title(5, 15),
              torrentSize: Random.natural(),
              module: Random.title(5, 10).replace(/\s/g, '.').toLowerCase(),
              description: Random.sentence()
            }
          }),
        total: 100
      }
    }
  },
  {
    url: '/api/maxbans',
    method: 'get',
    response: () => {
      return Array.from({ length: 4 })
        .fill(0)
        .map(() => {
          return {
            address: Random.ip(),
            count: Random.natural()
          }
        })
        .sort((a, b) => b.count - a.count)
    }
  }
]

export default banlogsMockAPI
