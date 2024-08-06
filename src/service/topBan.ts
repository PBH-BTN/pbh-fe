import type { topBanItem } from '@/api/model/topban'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { CommonResponse } from '@/api/model/common'

export async function getTopBan(limit: number): Promise<CommonResponse<topBanItem[]>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/bans/ranks'), location.href)
  url.searchParams.set('limit', String(limit))
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
