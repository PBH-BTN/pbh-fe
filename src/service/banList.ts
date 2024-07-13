import { type BanList, type UnbanCallback } from '@/api/model/banlist'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function getBanList(limit: number, lastBanTime?: number): Promise<BanList[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/bans'), location.href)
  url.searchParams.set('limit', String(limit))
  if (lastBanTime) {
    url.searchParams.set('lastBanTime', String(lastBanTime))
  }
  return fetch(url, {
    headers: getCommonHeader()
  }).then((res) => { endpointStore.assertResponseLogin(res); return res.json() })
}

export async function unbanIP(arr: Array<string>): Promise<UnbanCallback> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const url = new URL(urlJoin(endpointStore.endpoint, 'api/bans'), location.href)
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'DELETE',
    body: JSON.stringify( arr )
  }).then((res)=>{ return res.json() })
}
