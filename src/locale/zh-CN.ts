import settingsLocale from './zh-CN/settings'
import dashboardPageLocale from '@/views/dashboard/locale/zh-CN'
import banListPageLocale from '@/views/banlist/locale/zh-CN'
import banLogPageLocale from '@/views/banlog/locale/zh-CN'
import topBanPageLocale from '@/views/top-ban/locale/zh-CN'
import ruleMetricsLocale from '@/views/rule-metrics/locale/zh-CN'
import serviceLocale from '@/service/locale/zh-CN'
export default {
  'navbar.action.locale': '切换为中文',
  'navbar.action.autoUpdate': '自动刷新',
  'navbar.action.autoUpdate.lastUpdate': '最后更新于：',
  'main.workInProgressTips': '请注意，此功能仍在施工中，目前记录和展示的数据较为有限。',

  'router.dashboard': '状态',
  'router.banlist': '封禁名单',
  'router.banlogs': '封禁日志',
  'router.topban': '最多封禁',
  'router.ruleMetrics': '规则统计',

  ...settingsLocale,
  ...dashboardPageLocale,
  ...banListPageLocale,
  ...banLogPageLocale,
  ...topBanPageLocale,
  ...ruleMetricsLocale,
  ...serviceLocale
}
