import type { BanList } from '@/api/model/banlist'
import type { Statistic } from '@/api/model/statistic'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export function getStatistic(): Promise<Statistic> {
  const { endpoint } = useEndpointStore()
  const url = new URL(urlJoin(endpoint, 'api/statistic'), location.href)
  return fetch(url).then((res) => res.json())
}

export function getBanList(): Promise<BanList[]> {
  const { endpoint } = useEndpointStore()
  const url = new URL(urlJoin(endpoint, 'api/banlist'), location.href)
  return fetch(url).then((res) => res.json())
}
