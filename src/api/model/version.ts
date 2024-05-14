export interface version {
  version: string
  nativeImage: boolean
  os: string
  branch: string
  commit: string
  abbrev: string
}

export interface release {
  tagName: string
  url: string
}
