import type { version } from '@/api/model/version'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export function getVersion(): Promise<version> {
  const { endpoint } = useEndpointStore()

  const url = new URL(urlJoin(endpoint, 'api/version'), location.href)
  return fetch(url).then((res) => res.json())
}
