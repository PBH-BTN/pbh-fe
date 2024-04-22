import type { BanLog } from '@/api/model/banlogs'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export function getBanlogs(params: { pageIndex: number; pageSize?: number }): Promise<{
  pageIndex: number
  pageSize: number
  results: BanLog[]
  total: number
}> {
  const { endpoint } = useEndpointStore()

  const url = new URL(urlJoin(endpoint, 'api/banlogs'), location.href)
  url.searchParams.set('pageIndex', String(params.pageIndex - 1))
  if (params.pageSize) {
    url.searchParams.set('pageSize', String(params.pageSize))
  }
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return {
        ...res,
        pageIndex: res.pageIndex + 1
      }
    })
}
