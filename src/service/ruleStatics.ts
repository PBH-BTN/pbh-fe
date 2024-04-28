import type { RuleMetric } from '@/api/model/ruleStatics'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'

export async function getRuleStatic(): Promise<RuleMetric[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/ruleStatistic'), location.href)

  return fetch(url, { headers: getCommonHeader() }).then((res) => res.json())
}
