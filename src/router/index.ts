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
import RuleManageMent from '@/views/rule-management/index.vue'
import { useEndpointStore } from '@/stores/endpoint'
export const routerOptions: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      label: 'router.dashboard',
      needLogin: true
    },
    component: Dashboard
  },
  {
    path: '/list',
    name: 'banlist',
    meta: {
      label: 'router.banlist',
      needLogin: true
    },
    component: BanList
  },
  {
    path: '/log',
    name: 'banlogs',
    meta: {
      label: 'router.banlogs',
      needLogin: true
    },
    component: BanLog
  },
  {
    path: '/rule',
    name: 'rule_management',
    meta: {
      label: 'router.rule_management',
      disableAutoUpdate: true,
      needLogin: true
    },
    component: RuleManageMent
  },
  {
    path: '/top',
    name: 'top',
    meta: {
      label: 'router.topban',
      needLogin: true
    },
    component: TopBan
  },

  {
    path: '/metrics',
    name: 'rule_metrics',
    meta: {
      label: 'router.ruleMetrics',
      needLogin: true
    },
    component: RuleMetric
  },
  {
    path: '/init',
    name: 'init',
    meta: {
      hide: true,
      disableAutoUpdate: true
    },
    component: () => import('@/views/oobe/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      hide: true,
      disableAutoUpdate: true
    },
    component: () => import('@/views/login/index.vue')
  }
]

let basePath = location.pathname
for (const item of routerOptions) {
  if (basePath.endsWith(item.path)) {
    basePath = basePath.slice(0, -item.path.length)
    break
  }
}

routerOptions.push(
  ...[
    // default home page
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
        hide: true
      }
    }
  ]
)

const router = createRouter({
  history: createWebHistory(basePath),
  routes: routerOptions
})
router.afterEach((to, from) => {
  if (!from.name) {
    to.meta.transition = 'normal'
  } else {
    const toDepth = routerOptions.findIndex((item) => item.name === to.name)
    const fromDepth = routerOptions.findIndex((item) => item.name === from.name)
    to.meta.transition = toDepth > fromDepth ? 'route-right' : 'route-left'
  }
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
