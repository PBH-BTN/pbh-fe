import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function login(token: string): Promise<void> {
  const endpointStore = useEndpointStore()
  const url = new URL(urlJoin(endpointStore.endpoint, '/api/auth/login'), location.href)
  fetch(url, {
    headers: getCommonHeader(),
    method: 'POST',
    body: JSON.stringify({
      token
    })
  })
}
