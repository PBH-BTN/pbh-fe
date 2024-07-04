import type { BanList } from '@/api/model/banlist'
import { useEndpointStore } from '@/stores/endpoint'
import path from 'path'
import { getCommonHeader } from './utils'

export async function getBanList(limit: number, lastBanTime?: number): Promise<BanList[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(path.join(endpointStore.endpoint, 'api/bans'), location.href)
  url.searchParams.set('limit', String(limit))
  if (lastBanTime) {
    url.searchParams.set('lastBanTime', String(lastBanTime))
  }
  return fetch(url, {
    headers: getCommonHeader()
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
