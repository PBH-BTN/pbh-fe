export interface ClientStatus {
  name: string
  peers: number
  torrents: number
  endpoint: string
  status: ClientStatusEnum
  type: ClientTypeEnum
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
