import type { BanList } from '@/api/model/banlist'
import type { Statistic } from '@/api/model/statistic'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export function getStatistic(): Promise<Statistic> {
  const { endpoint } = useEndpointStore()
  const url = new URL(urlJoin(endpoint, 'api/statistic'), location.href)
  return fetch(url).then((res) => res.json())
}

export function getBanList(params: { limit: number; lastBanTime?: number }): Promise<BanList[]> {
  const { endpoint } = useEndpointStore()
  const url = new URL(urlJoin(endpoint, 'api/banlist'), location.href)
  url.searchParams.set('limit', String(params.limit))
  if (params.lastBanTime) {
    url.searchParams.set('lastBanTime', String(params.lastBanTime))
  }
  return fetch(url).then((res) => res.json())
}
