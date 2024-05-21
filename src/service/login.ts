import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function login(token: string) {
  const endpointStore = useEndpointStore()
  const url = new URL(urlJoin(endpointStore.endpoint, '/api/auth/login'), location.href)
  return fetch(url, {
    headers: getCommonHeader(false),
    method: 'POST',
    body: JSON.stringify({
      token
    })
  }).then(async (res) => {
    const resp = await res.json()
    if (res.status !== 200) {
      throw new Error(resp.message)
    }
  })
}
