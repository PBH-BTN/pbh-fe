import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { CommonResponse, CommonResponseWithoutData } from '@/api/model/common'
import type { ruleBrief } from '@/api/model/ruleSubscribe'

export async function getRuleList(): Promise<CommonResponse<ruleBrief[]>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/sub/rules'), location.href)

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function ToggleRuleEnable(
  ruleId: string,
  enable: boolean
): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, `api/sub/rule/${ruleId}`), location.href)

  return fetch(url, {
    headers: getCommonHeader(),
    method: 'PATCH',
    body: JSON.stringify({
      enabled: enable
    })
  })
    .then((res) => {
      endpointStore.assertResponseLogin(res)
      return res.json()
    })
    .catch((e: Error) => {
      console.log(e)
    })
}
