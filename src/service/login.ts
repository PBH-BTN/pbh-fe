import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export class IncorrectTokenError extends Error {
  static name = "IncorrectTokenError" as const
  name = IncorrectTokenError.name

  static is(err: unknown): err is IncorrectTokenError {
    return (err as Error)?.name === IncorrectTokenError.name
  }
}

/**
 * server version >= 4.0.0
 */
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
    if (res.status === 401) {
      throw new IncorrectTokenError(resp.message)
    } else if (res.status !== 200) {
      throw new Error(resp.message)
    }
  })
}
