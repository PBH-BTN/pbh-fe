export interface RuleMetric {
  type: string
  hit: number
  query: number
  metadata: {
    rule: string
  }
}
