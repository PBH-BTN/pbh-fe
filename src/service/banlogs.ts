export function getBanlogs(params: { pageIndex: number; pageSize?: number }) {
  const url = new URL('api/banlogs', location.href)
  url.searchParams.set('pageIndex', String(params.pageIndex))
  if (params.pageSize) {
    url.searchParams.set('pageSize', String(params.pageSize))
  }
  return fetch(url).then((res) => res.json())
}
