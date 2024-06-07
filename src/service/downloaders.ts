import type { ClientStatus, Downloader, Torrent } from '@/api/model/clientStatus'
import type { Statistic } from '@/api/model/statistic'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import { useDownloader } from '@/stores/downloader'

export async function getClientStatus() {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable
  const { downloaders } = useDownloader()
  return Promise.all(
    downloaders.map((downloader) => {
      const url = new URL(
        urlJoin(endpointStore.endpoint, `api/downloaders/${downloader.name}/status`),
        location.href
      )
      return fetch(url, { headers: getCommonHeader() })
        .then((res) => {
          endpointStore.assertResponseLogin(res)
          return res.json()
        })
        .then((s: ClientStatus) => ({
          ...downloader,
          ...s
        }))
    })
  )
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
