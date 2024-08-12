import type { topBanItem } from '@/api/model/topban'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { CommonResponseWithPage } from '@/api/model/common'

export async function getRanks(params: {
  pageIndex: number
  pageSize?: number
}): Promise<CommonResponseWithPage<topBanItem[]>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/bans/ranks'), location.href)
  url.searchParams.set('pageIndex', String(params.pageIndex))
  if (params.pageSize) {
    url.searchParams.set('pageSize', String(params.pageSize))
  }
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
