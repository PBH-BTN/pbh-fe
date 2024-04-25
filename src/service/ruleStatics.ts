import type { RuleMetric } from '@/api/model/ruleStatics'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export function getRuleStatic(): Promise<RuleMetric[]> {
  const { endpoint } = useEndpointStore()

  const url = new URL(urlJoin(endpoint, 'api/ruleStatistic'), location.href)
  return fetch(url).then((res) => res.json())
}
