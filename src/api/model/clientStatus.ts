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
  qBittorrent = 'qBittorrent',
  Transmission = 'Transmission'
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

export type downloaderConfig = qBittorrentConfig | transmissionConfig

export interface qBittorrentConfig {
  type: ClientTypeEnum
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
  type: ClientTypeEnum
  endpoint: string
  username: string
  password: string
  httpVersion: string
  verifySsl: boolean
  rpcUrl: string
}

export interface CreateDownloadRequest {
  name: string
  config: downloaderConfig
}

export interface TestDownloaderResponse {
  valid: boolean
  message: string
}
