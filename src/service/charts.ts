import type { CommonResponse } from '@/api/model/common'
import type { AnalysisField, TimeStatisticItem, Trends } from '@/api/model/statistic'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function getAnalysisDataByField(
  field: 'peerId' | 'torrentName' | 'module',
  filter = false
): Promise<CommonResponse<AnalysisField[]>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const query = new URLSearchParams({
    type: 'count',
    field,
    filter: filter ? '0.01' : '0'
  })
  const url = new URL(
    urlJoin(endpointStore.endpoint, `api/statistic/analysis/field?` + query.toString()),
    location.href
  )

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function getTimebasedStaticsData(
  startAt: Date,
  endAt: Date,
  type: 'day' | 'hour'
): Promise<CommonResponse<TimeStatisticItem[]>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const query = new URLSearchParams({
    startAt: startAt.getTime().toString(),
    endAt: endAt.getTime().toString(),
    type,
    field: 'banAt'
  })
  const url = new URL(
    urlJoin(endpointStore.endpoint, `api/statistic/analysis/date?` + query.toString()),
    location.href
  )

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function getTrends(startAt: Date, endAt: Date): Promise<CommonResponse<Trends>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const query = new URLSearchParams({
    startAt: startAt.getTime().toString(),
    endAt: endAt.getTime().toString()
  })
  const url = new URL(
    urlJoin(endpointStore.endpoint, `api/chart/trend?` + query.toString()),
    location.href
  )

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
