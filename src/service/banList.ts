import type { BanList } from '@/api/model/banlist'
import type { Statistic } from '@/api/model/statistic'

export function getStatistic(): Promise<Statistic> {
  const url = new URL(import.meta.env.VITE_APP_BASE_URL + 'api/statistic', location.href)
  return fetch(url).then((res) => res.json())
}

export function getBanList(): Promise<BanList[]> {
  const url = new URL(import.meta.env.VITE_APP_BASE_URL + 'api/banlist', location.href)
  return fetch(url).then((res) => res.json())
}
