import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { InitReq } from '@/api/model/init'
import type { CommonResponseWithoutData } from '@/api/model/common'

export async function InitPBH(req: InitReq): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, '/api/oobe/init'), location.href)

  return fetch(url, { headers: getCommonHeader(), body: JSON.stringify(req), method: 'POST' }).then(
    (res) => res.json()
  )
}
