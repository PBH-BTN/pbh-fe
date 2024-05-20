export interface ClientStatus {
  activePeers: number
  activeTorrents: number
  lastStatus: ClientStatusEnum
}

export enum ClientStatusEnum {
  HEALTHY = 'HEALTHY',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN'
}

export enum ClientTypeEnum {
  qBittorrent = 'qBittorrent',
  Transmission = 'Transmission'
}

export interface Downloader {
  name: string
  endpoint: string
  type: ClientStatusEnum
}
