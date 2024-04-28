import {
  createRouter,
  createWebHistory,
  useRoute,
  useRouter,
  type RouteRecordRaw
} from 'vue-router'
import Dashboard from '../views/dashboard/index.vue'
import { computed } from 'vue'
import BanList from '@/views/banlist/index.vue'
import BanLog from '@/views/banlog/index.vue'
import TopBan from '@/views/top-ban/index.vue'
import RuleMetric from '@/views/rule-metrics/index.vue'

export const routerOptions: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      label: 'router.dashboard'
    },
    component: Dashboard
  },
  {
    path: '/list',
    name: 'banlist',
    meta: {
      label: 'router.banlist'
    },
    component: BanList
  },
  {
    path: '/log',
    name: 'banlogs',
    meta: {
      label: 'router.banlogs'
    },
    component: BanLog
  },
  {
    path: '/top',
    name: 'top',
    meta: {
      label: 'router.topban'
    },
    component: TopBan
  },
  {
    path: '/metrics',
    name: 'rule_metrics',
    meta: {
      label: 'router.ruleMetrics'
    },
    component: RuleMetric
  },
  {
    path: '/:pathMatch(.*)*', // 404
    name: 'not-found',
    meta: {
      hidden: true,
      label: '404'
    },
    redirect: { name: 'dashboard' }
  }
]

let basePath = location.pathname
for (const item of routerOptions) {
  if (!item.meta?.hidden && basePath.endsWith(item.path)) {
    basePath = basePath.slice(0, -item.path.length)
    break
  }
}

const router = createRouter({
  history: createWebHistory(basePath),
  routes: routerOptions
})

export default router

export function useViewRoute() {
  const router = useRouter()
  const route = useRoute()
  const goto = (name: string | number) => {
    router.replace({ name: `${name}` })
  }
  const routers = computed(() => {
    return routerOptions.filter((item) => !item.meta?.hidden)
  })
  const currentName = computed(() => route.name as string | undefined)
  return [routers, currentName, goto] as const
}
