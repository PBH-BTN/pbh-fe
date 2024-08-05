export type ruleType = 'ip' | 'port' | 'asn' | 'region' | 'netType'

export type BlackList<T extends ruleType> = {
  [K in T]: K extends 'port' | 'asn' ? number[] : string[]
}
