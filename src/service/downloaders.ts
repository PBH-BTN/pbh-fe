import type {
  ClientStatus,
  CreateDownloadRequest,
  Downloader,
  TestDownloaderResponse,
  Torrent
} from '@/api/model/clientStatus'
import type { Statistic } from '@/api/model/statistic'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { CommonResponseWithoutData } from '@/api/model/common'

export async function getClientStatus(name: string): Promise<ClientStatus> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const url = new URL(
    urlJoin(endpointStore.endpoint, `api/downloaders/${name}/status`),
    location.href
  )
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function getStatistic(): Promise<Statistic> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, '/api/statistic/counter'), location.href)
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function getDownloaders(): Promise<Downloader[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, '/api/downloaders'), location.href)
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function getTorrents(downloader: string): Promise<Torrent[]> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const url = new URL(
    urlJoin(endpointStore.endpoint, `/api/downloaders/${downloader}/torrents`),
    location.href
  )
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function CreateDownloader(
  req: CreateDownloadRequest
): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const url = new URL(urlJoin(endpointStore.endpoint, `/api/downloaders`), location.href)
  return fetch(url, { method: 'PUT', headers: getCommonHeader(), body: JSON.stringify(req) }).then(
    async (res) => {
      endpointStore.assertResponseLogin(res)
      return res.json()
    }
  )
}

export async function UpdateDownloader(
  req: CreateDownloadRequest
): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const url = new URL(
    urlJoin(endpointStore.endpoint, `/api/downloaders/${req.name}`),
    location.href
  )
  return fetch(url, {
    method: 'PATCH',
    headers: getCommonHeader(),
    body: JSON.stringify(req)
  }).then(async (res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function TestDownloaderConfig(
  req: CreateDownloadRequest
): Promise<TestDownloaderResponse> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const url = new URL(urlJoin(endpointStore.endpoint, `/api/downloaders/test`), location.href)
  return fetch(url, { method: 'POST', headers: getCommonHeader(), body: JSON.stringify(req) }).then(
    (res) => {
      endpointStore.assertResponseLogin(res)
      return res.json()
    }
  )
}

export async function DeleteDownloader(name: string): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const url = new URL(urlJoin(endpointStore.endpoint, `/api/downloaders/${name}`), location.href)
  return fetch(url, { method: 'DELETE', headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
