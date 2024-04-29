import type { BanLog } from '@/api/model/banlogs'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function getBanlogs(params: { pageIndex: number; pageSize?: number }): Promise<{
  pageIndex: number
  pageSize: number
  results: BanLog[]
  total: number
}> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/banlogs'), location.href)
  url.searchParams.set('pageIndex', String(params.pageIndex - 1))
  if (params.pageSize) {
    url.searchParams.set('pageSize', String(params.pageSize))
  }
  return fetch(url, { headers: getCommonHeader() })
    .then((res) => res.json())
    .then((res) => {
      return {
        ...res,
        pageIndex: res.pageIndex + 1
      }
    })
}
