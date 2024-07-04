import type { topBanItem } from '@/api/model/topban'
import { useEndpointStore } from '@/stores/endpoint'
import { getCommonHeader } from './utils'
import path from 'path'

export async function getTopBan(limit: number): Promise<topBanItem[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(path.join(endpointStore.endpoint, 'api/bans/ranks'), location.href)
  url.searchParams.set('limit', String(limit))
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
