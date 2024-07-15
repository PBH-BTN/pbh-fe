import type { GetRuleMetricsResponse } from '@/api/model/ruleStatics'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { AnalysisField, TimeStatisticItem } from '@/api/model/statistic'
import type { CommonResponse } from '@/api/model/common'

export async function getRuleStatic(): Promise<GetRuleMetricsResponse> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/statistic/rules'), location.href)

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

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
