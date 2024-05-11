export interface BanList {
  address: string
  banMetadata: BanMetadata
}

export interface BanMetadata {
  context: string
  randomId: string
  banAt: number
  unbanAt: number
  torrent: Torrent
  peer: Peer
  description: string
  reverseLookup: string
  geo?: GeoLocation
  asn?: ASN
}

export interface Torrent {
  id: string
  size: number
  name: string
  hash: string
}

export interface Peer {
  address: Address
  id: string
  clientName: string
  downloaded: number
  uploaded: number
  progress: number
}

export interface Address {
  port: number
  ip: string
}

export interface GeoLocation {
  iso: string
  countryRegion: string
  city: string
  latitude: number
  longitude: number
  accuracyRadius: number
}

export interface ASN {
  asn: number
  asOrganization: string
  asNetwork: string
}
