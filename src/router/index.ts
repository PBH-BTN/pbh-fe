import {
  createRouter,
  createWebHistory,
  useRoute,
  useRouter,
  type RouteRecordName,
  type RouteRecordRaw
} from 'vue-router'
import Dashboard from '../views/DashBoard.vue'
import { computed } from 'vue'

export const routerOptions: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      label: '状态'
    },
    component: Dashboard
  },
  {
    path: '/list',
    name: 'banlist',
    meta: {
      label: '封禁名单'
    },
    component: () => import('../views/BanListView.vue')
  },
  {
    path: '/log',
    name: 'banlogs',
    meta: {
      label: '封禁日志'
    },
    component: () => import('../views/LogView.vue') // 懒加载
  },
  {
    path: '/top',
    name: 'top',
    meta: {
      label: '最多封禁'
    },
    component: () => import('../views/TopBanView.vue')
  },
  {
    path: '/metrics',
    name: 'rule_metrics',
    meta: {
      label: '规则统计'
    },
    component: () => import('../views/RuleMetrics.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 404
    name: 'not-found',
    meta: {
      hidden: true
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
  const goto = (name: RouteRecordName) => {
    router.replace({ name })
  }
  const routers = computed(() => {
    return routerOptions.filter((item) => !item.meta?.hidden)
  })
  const currentName = computed(() => route.name)
  return [routers, currentName, goto] as const
}
