import type { ClientStatus } from '@/api/model/clientStatus'
import type { Statistic } from '@/api/model/statistic'
import axios from '@/api/client'

export const getClientStatus = (): Promise<ClientStatus[]> =>
  axios.get('api/clientStatus').then((res) => res.data)

export const getStatistic = (): Promise<Statistic> =>
  axios.get('api/statistic').then((res) => res.data)
