import type { KV } from './common'

export interface Statistic {
  peerUnbanCounter: number
  peerBanCounter: number
  checkCounter: number
  banlistCounter: number
  bannedIpCounter: number
}

export interface AnalysisField {
  data: string
  count: number
  percent: number
}

export interface TimeStatisticItem {
  timestamp: number
  count: number
  percent: number
}

export interface Trends {
  connectedPeersTrend: KV<number, number>[]
  bannedPeersTrend: KV<number, number>[]
}

export interface Traffic {
  allTimeUploaded: number
  allTimeDownloaded: number
  journal: {
    timestamp: number
    uploaded: number
    downloaded: number
  }[]
}

export interface GeoIP {
  city: City[];
  isp: Isp[];
  province: Province[];
}

export interface City {
  key: string;
  value: number;
}

export interface Isp {
  key: string;
  value: number;
}

export interface Province {
  key: string;
  value: number;
}