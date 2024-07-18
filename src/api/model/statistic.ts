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
