import type { RuleMetric } from '@/api/model/ruleStatics'
import axios from '@/api/client'

export const getRuleStatic = (): Promise<RuleMetric[]> =>
  axios.get('api/ruleStatistic').then((res) => res.data)
