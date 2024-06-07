import type { module } from '@/api/model/manifest'
export const SubscribeClassName = 'com.ghostchu.peerbanhelper.module.impl.webapi.RuleSubController'
export function isEnableSubscribe(moduleList: module[]) {
  return moduleList.some((module) => module.className === SubscribeClassName)
}
