export interface clientStatus {
  name: string
  peers: number
  torrents: number
  endpoint: string
  status: ClientStatus
}

export enum ClientStatus {
  HEALTHY = 'HEALTHY',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN'
}
