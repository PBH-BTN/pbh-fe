import type { clientStatus } from '@/api/model/clientStatus'

export function getClientStatus(): Promise<clientStatus[]> {
  const url = new URL('api/clientStatus', location.href)
  return fetch(url).then((res) => res.json())
}
