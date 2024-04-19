import type { banlog } from '@/api/model/banlogs'

export function getBanlogs(params: { pageIndex: number; pageSize?: number }): Promise<{
  pageIndex: Number
  pageSize: Number
  results: banlog[]
  total: Number
}> {
  const url = new URL(import.meta.env.VITE_APP_BASE_URL + 'api/banlogs', location.href)
  url.searchParams.set('pageIndex', String(params.pageIndex))
  if (params.pageSize) {
    url.searchParams.set('pageSize', String(params.pageSize))
  }
  return fetch(url).then((res) => res.json())
}
