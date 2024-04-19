export interface ClientStatus {
  name: string
  peers: number
  torrents: number
  endpoint: string
  status: ClientStatusEnum
}

export enum ClientStatusEnum {
  HEALTHY = 'HEALTHY',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN'
}
