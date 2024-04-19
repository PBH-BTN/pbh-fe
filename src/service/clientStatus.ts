import type { ClientStatus } from '@/api/model/clientStatus'

export function getClientStatus(): Promise<ClientStatus[]> {
  const url = new URL(import.meta.env.VITE_APP_BASE_URL + 'api/clientStatus', location.href)
  return fetch(url).then((res) => res.json())
}
