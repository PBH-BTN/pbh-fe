import type { ClientStatus } from '@/api/model/clientStatus'
import type { Statistic } from '@/api/model/statistic'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function getClientStatus(): Promise<ClientStatus[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/clientStatus'), location.href)
  return fetch(url, { headers: getCommonHeader() }).then((res) => res.json())
}

export async function getStatistic(): Promise<Statistic> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/statistic'), location.href)
  return fetch(url, { headers: getCommonHeader() }).then((res) => res.json())
}
