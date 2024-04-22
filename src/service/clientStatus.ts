import type { ClientStatus } from '@/api/model/clientStatus'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export function getClientStatus(): Promise<ClientStatus[]> {
  const { endpoint } = useEndpointStore()

  const url = new URL(urlJoin(endpoint, 'api/clientStatus'), location.href)
  return fetch(url).then((res) => res.json())
}
