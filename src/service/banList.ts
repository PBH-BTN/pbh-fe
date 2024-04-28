import type { BanList } from '@/api/model/banlist'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function getBanList(params: {
  limit: number
  lastBanTime?: number
}): Promise<BanList[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/banlist'), location.href)
  url.searchParams.set('limit', String(params.limit))
  if (params.lastBanTime) {
    url.searchParams.set('lastBanTime', String(params.lastBanTime))
  }
  return fetch(url, {
    headers: getCommonHeader()
  }).then((res) => res.json())
}
