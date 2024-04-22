import type { topBanItem } from '@/api/model/topban'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export function getTopBan(params: { num: number }): Promise<topBanItem[]> {
  const { endpoint } = useEndpointStore()

  const url = new URL(urlJoin(endpoint, 'api/maxbans'), location.href)
  url.searchParams.set('num', String(params.num))
  return fetch(url).then((res) => res.json())
}
