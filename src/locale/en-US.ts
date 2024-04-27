import settingsLocale from './en-US/settings'
import dashboardPageLocale from '@/views/dashboard/locale/en-US'
export default {
  'navbar.action.locale': 'Switch to English',
  'navbar.action.autoUpdate': 'Auto Update',
  'navbar.action.autoUpdate.on': 'On',
  'navbar.action.autoUpdate.off': 'Off',
  'navbar.action.autoUpdate.lastUpdate': 'Last updated at: ',
  'main.workInProgressTips':
    'This feature is still working in progress, and the data currently recorded and displayed is relatively limited',

  'router.dashboard': 'Status',
  'router.banlist': 'Ban List',
  'router.banlogs': 'Ban Logs',
  'router.topban': 'Top Bans',
  'router.ruleMetrics': 'Rule Metrics',

  ...settingsLocale,
  ...dashboardPageLocale
}
