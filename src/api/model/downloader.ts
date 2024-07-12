export interface ClientStatus {
  activePeers: number
  activeTorrents: number
  lastStatus: ClientStatusEnum
  lastStatusMessage: string
  config: downloaderConfig
}

export enum ClientStatusEnum {
  HEALTHY = 'HEALTHY',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN',
  NEED_TAKE_ACTION = 'NEED_TAKE_ACTION'
}

export enum ClientTypeEnum {
  qBittorrent = 'qbittorrent',
  Transmission = 'transmission',
  BiglyBT = 'biglybt',
  Deluge = 'deluge',
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
  rtDownloadSpeed: number
  rtUploadSpeed: number
}

export interface PeerInfo {
  /**
   * Peer 的 IP 的 ASN 信息
   */
  asn: Asn
  /**
   * 下载器名称
   */
  downloader: string
  /**
   * Peer 地理位置信息
   */
  geo: Geo
  /**
   * Peer 信息
   */
  peer: Peer
  /**
   * 随机 ID
   */
  randomId: string
  /**
   * Peer IP 反查结果，N/A 代表无结果或者查询被禁用
   */
  reverseLookup: string
  /**
   * 种子
   */
  torrent: TorrentWrapper
}

/**
 * Peer 的 IP 的 ASN 信息
 */
interface Asn {
  /**
   * AS号码
   */
  asn: number
  /**
   * AS IP段
   */
  asNetwork: string
  /**
   * AS所属组织
   */
  asOrganization: string
}

/**
 * Peer 地理位置信息
 */
interface Geo {
  /**
   * 精确半径
   */
  accuracyRadius: number
  /**
   * 城市 显示名称
   */
  city?: string
  /**
   * 国家/地区 显示名称
   */
  countryRegion: string
  /**
   * 国家/地区 ISO 代码，ZH, JP, TW
   */
  iso: string
  /**
   * 纬度
   */
  latitude: number
  /**
   * 经度
   */
  longitude: number
}

/**
 * Peer 信息
 */
interface Peer {
  /**
   * Peer 连接信息
   */
  address: Address
  /**
   * BitTorrent BEP Client Name (User-Agent)
   */
  clientName: string
  /**
   * 已下载字节数
   */
  downloaded: number
  /**
   * 下载速度（单位由下载器决定），单位通常为bytes/s
   */
  downloadSpeed: number
  /**
   * BitTorrent BEP 标志，https://github.com/PBH-BTN/quick-references/blob/main/utp_flags.md
   */
  flags: PeerFlags
  /**
   * BitTorrent BEP PeerID
   */
  id: string
  /**
   * 下载进度，0~1；1=100%
   */
  progress: number
  /**
   * 已上传字节数
   */
  uploaded: number
  /**
   * 上传速度（单位由下载器决定），单位通常为bytes/s
   */
  uploadSpeed: number
}

/**
 * Peer Flags
 */
interface PeerFlags{
  /**
   * **we** have choked this peer.
   */
  choked?: boolean;
  /**
   * The connection is in a half-open state (i.e. it is being connected).
   */
  connecting?: boolean;
  /**
   * This means the last time this peer picket a piece, it could not pick as many as it wanted
   * because there were not enough free ones. i.e. all pieces this peer has were already
   * requested from other peers.
   */
  endGameMode?: boolean;
  /**
   * The peer was received from the kademlia DHT.
   */
  fromDHT?: boolean;
  /**
   * we received an incoming connection from this peer
   */
  fromIncoming?: boolean;
  /**
   * The peer was received from the local service discovery (The peer is on the local network).
   */
  fromLSD?: boolean;
  /**
   * The peer was received from the peer exchange extension.
   */
  fromPEX?: boolean;
  /**
   * The peer was added from the fast resume data.
   */
  fromResumeData?: boolean;
  /**
   * The peer was received from the tracker.
   */
  fromTracker?: boolean;
  /**
   * The connection is opened, and waiting for the handshake. Until the handshake is done, the
   * peer cannot be identified.
   */
  handshake?: boolean;
  /**
   * This flag is set if the peer was in holepunch mode when the connection succeeded. This
   * typically only happens if both peers are behind a NAT and the peers connect via the NAT
   * holepunch mechanism.
   */
  holePunched?: boolean;
  /**
   * indicates that this socket is running on top of the I2P transport.
   */
  i2pSocket?: boolean;
  /**
   * **we** are interested in pieces from this peer.
   */
  interesting?: boolean;
  /**
   * deprecated synonym for outgoing_connection
   */
  localConnection?: boolean;
  /**
   * 标准 libTorrent 标志，不管下载器原始 Flags 如何，PBH 总是将其转换为 LT 的 Flags
   */
  ltStdString: string;
  /**
   * The peer has participated in a piece that failed the hash check, and is now "on parole",
   * which means we're only requesting whole pieces from this peer until it either fails that
   * piece or proves that it doesn't send bad data.
   */
  onParole?: boolean;
  /**
   * This peer is subject to an optimistic unchoke. It has been unchoked for a while to see if
   * it might unchoke us in return an earn an upload/unchoke slot. If it doesn't within some
   * period of time, it will be choked and another peer will be optimistically unchoked.
   */
  optimisticUnchoke?: boolean;
  /**
   * The connection was initiated by us, the peer has a listen port open, and that port is the
   * same as in the address of this peer. If this flag is not set, this peer connection was
   * opened by this peer connecting to us.
   */
  outgoingConnection?: boolean;
  /**
   * the handshake of this connection was obfuscated with a Diffie-Hellman exchange
   */
  plainTextEncrypted?: boolean;
  /**
   * this connection is obfuscated with RC4
   */
  rc4Encrypted?: boolean;
  /**
   * the peer has choked **us**.
   */
  remoteChoked?: boolean;
  /**
   * the peer is interested in **us**
   */
  remoteInterested?: boolean;
  /**
   * This peer is a seed (it has all the pieces).
   */
  seed?: boolean;
  /**
   * This peer has recently failed to send a block within the request timeout from when the
   * request was sent. We're currently picking one block at a time from this peer.
   */
  snubbed?: boolean;
  /**
   * indicates that this socket is running on top of an SSL (TLS) channel
   */
  sslSocket?: boolean;
  /**
   * means that this peer supports the extension protocol
   */
  supportsExtensions?: boolean;
  /**
   * This peer has either explicitly (with an extension) or implicitly (by becoming a seed)
   * told us that it will not downloading anything more, regardless of which pieces we have.
   */
  uploadOnly?: boolean;
  /**
   * indicates that this socket is a uTP socket
   */
  utpSocket?: boolean;
}

/**
 * Peer 连接信息
 */
interface Address {
  /**
   * 连接 IP
   */
  ip: string
  /**
   * 连接端口
   */
  port: number
}

/**
 * 种子
 *
 * Torrent 信息
 */
interface TorrentWrapper {
  /**
   * 种子首选 info_hash，具体是 v1 的还是 v2 的由下载器决定
   */
  hash?: string
  /**
   * 该种子在下载器中的唯一识别符
   */
  id?: string
  /**
   * 种子名称
   */
  name?: string
  /**
   * 下载速率，单位 bytes
   */
  rtDownloadSpeed?: number
  /**
   * 上传速率，单位 bytes
   */
  rtUploadSpeed?: number
  /**
   * 种子大小（bytes）
   */
  size?: number
}

export type downloaderConfig = qBittorrentConfig | transmissionConfig | biglybtConfig | delugeConfig

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

export interface delugeConfig {
  type: ClientTypeEnum.Deluge
  endpoint: string
  password: string
  httpVersion: string
  incrementBan: boolean
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
