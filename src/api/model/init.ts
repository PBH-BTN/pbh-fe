import type { downloaderConfig } from './downloader'

export interface InitReq {
  token: string
  downloader: downloaderConfig
}
