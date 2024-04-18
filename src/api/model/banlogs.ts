export interface banlog {
  pageIndex: Number
  pageSize: Number
  result: {
    banAt: Number
    unbanAt: Date
    peerIp: String
    peerPort: Number
    peerId: String
    peerClientName: String
    peerUploaded: Number
    peerDownloaded: Number
    peerProgress: Number
    torrentInfoHash: String
    torrentName: String
    torrentSize: Number
    module: String
    description: String
  }[]
  total: Number
}
