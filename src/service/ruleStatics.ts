import type { GetRuleMetricsResponse } from '@/api/model/ruleStatics'
import axios from '@/api/client'

export const getRuleStatic = (): Promise<GetRuleMetricsResponse> =>
  axios.get('api/ruleStatistic').then((res) => res.data)
