export interface ClientStatus {
  activePeers: number
  activeTorrents: number
  lastStatus: ClientStatusEnum
  config: downloaderConfig
}

export enum ClientStatusEnum {
  HEALTHY = 'HEALTHY',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN'
}

export enum ClientTypeEnum {
  qBittorrent = 'qbittorrent',
  Transmission = 'transmission',
  BiglyBT = 'biglybt',
  Unknown = 'Unknown'
}

export interface Downloader {
  name: string
  endpoint: string
  type: ClientStatusEnum
}

export interface Torrent {
  id: string
  size: number
  name: string
  hash: string
}

export type downloaderConfig = qBittorrentConfig | transmissionConfig | biglybtConfig

export interface qBittorrentConfig {
  type: ClientTypeEnum.qBittorrent
  endpoint: string
  username: string
  password: string
  basicAuth: BasicAuth
  httpVersion: string
  incrementBan: boolean
  verifySsl: boolean
}

interface BasicAuth {
  user: string
  pass: string
}

export interface transmissionConfig {
  type: ClientTypeEnum.Transmission
  endpoint: string
  username: string
  password: string
  httpVersion: string
  verifySsl: boolean
  rpcUrl: string
}

export interface biglybtConfig {
  type: ClientTypeEnum.BiglyBT
  endpoint: string
  token: string
  httpVersion: string
  verifySsl: boolean
}

export interface CreateDownloadRequest {
  name: string
  config: downloaderConfig
}

export interface TestDownloaderResponse {
  valid: boolean
  message: string
}
