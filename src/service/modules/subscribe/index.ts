import type { module } from '@/api/model/manifest'
export const SubscribeClassName = 'com.ghostchu.peerbanhelper.module.impl.webapi.RuleSubController'
export function isEnableSubscribe(moduleList?: readonly module[]) {
  if (!moduleList) return false
  return moduleList.some((module) => module.className === SubscribeClassName)
}
