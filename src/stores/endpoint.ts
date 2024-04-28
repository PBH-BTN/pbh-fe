import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getVersion } from '@/service/version'
import { computed, readonly, ref } from 'vue'
import type { version } from '@/api/model/version'

function newPromiseLock<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  const p = new Promise<T>((res) => (resolve = res))
  return Object.assign(p, { resolve })
}

export const useEndpointStore = defineStore('endpoint', () => {
  const endpoint = useStorage('endpoint', import.meta.env.VITE_APP_BASE_URL)
  const serverAvailable = ref(newPromiseLock<void>())
  const serverVersion = ref<version | null>()
  const status = ref<'checking' | 'pass' | 'fail'>('checking')
  const error = ref<Error | null>(null)
  const setEndpoint = async (value: string) => {
    status.value = 'checking'
    endpoint.value = value
    const newVersion = newPromiseLock<void>()
    serverAvailable.value.resolve(newVersion)
    serverAvailable.value = newVersion
    try {
      serverVersion.value = await getVersion(value)
      serverAvailable.value.resolve()
      status.value = 'pass'
      return true
    } catch (err) {
      error.value = err as Error
      status.value = 'fail'
      throw err
    }
  }
  // init
  setEndpoint(endpoint.value)
  return {
    endpoint: readonly(endpoint),
    serverAvailable: readonly(serverAvailable),
    serverVersion: readonly(serverVersion),
    loading: computed(() => status.value === 'checking'),
    error: computed(() => (status.value === 'fail' ? error.value : null)),
    setEndpoint
  }
})
