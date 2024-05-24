import type { topBanItem } from '@/api/model/topban'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function getTopBan(num: number): Promise<topBanItem[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/bans/ranks'), location.href)
  url.searchParams.set('num', String(num))
  return fetch(url, { headers: getCommonHeader() }).then((res) => { endpointStore.assertResponseLogin(res); return res.json() })
}
