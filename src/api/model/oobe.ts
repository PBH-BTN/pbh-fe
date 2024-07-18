import type { downloaderConfig } from './downloader'

interface initDownloaderConfig {
  name: string
  downloaderConfig: downloaderConfig
}
export interface InitConfig {
  token: string
  downloaderConfig: initDownloaderConfig
}
