import type { topBanItem } from '@/api/model/topban'
import axios from '@/api/client'

export const getTopBan = (params: { num: number }): Promise<topBanItem[]> =>
  axios.get('api/maxbans', { params: { num: params.num } }).then((res) => res.data)
