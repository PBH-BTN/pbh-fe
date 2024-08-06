import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { ruleType, BlackList } from '@/api/model/blacklist'
import type { CommonResponse } from '@/api/model/common'

export async function getBlackList<T extends ruleType>(
  type: T
): Promise<CommonResponse<BlackList<T>>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(
    urlJoin(endpointStore.endpoint, `/api/modules/ipblacklist/${type}`),
    location.href
  )

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
