import {
  createRouter,
  createWebHistory,
  useRoute,
  useRouter,
  type RouteRecordName,
  type RouteRecordRaw
} from 'vue-router'
import Dashboard from '../views/DashBoard.vue'
import LogView from '../views/LogView.vue'
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
    path: '/log',
    name: 'banlogs',
    meta: {
      label: '封禁日志'
    },
    component: LogView
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
