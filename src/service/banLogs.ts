import type { BanLog } from '@/api/model/banlogs'
import axios from '@/api/client'

export const getBanlogs = (params: {
  pageIndex: number
  pageSize?: number
}): Promise<{
  pageIndex: number
  pageSize: number
  results: BanLog[]
  total: number
}> =>
  axios
    .get('api/banlogs', {
      params: {
        pageIndex: params.pageIndex - 1,
        pageSize: params.pageSize
      }
    })
    .then((res) => ({
      ...res.data,
      pageIndex: res.data.pageIndex + 1
    }))
