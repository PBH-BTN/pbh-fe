import type { BanList } from '@/api/model/banlist'
import axios from '@/api/client'

export const getBanList = (params: { limit: number; lastBanTime?: number }): Promise<BanList[]> =>
  axios
    .get('api/banlist', {
      params: {
        limit: params.limit,
        lastBanTime: params.lastBanTime
      }
    })
    .then((res) => res.data)
