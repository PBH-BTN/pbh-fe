import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getLatestVersion, getVersion } from '@/service/version'
import { computed, readonly, ref } from 'vue'
import type { release, version } from '@/api/model/version'
import { Message } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'

function newPromiseLock<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  const p = new Promise<T>((res) => (resolve = res))
  return Object.assign(p, { resolve })
}

export const useEndpointStore = defineStore('endpoint', () => {
  const endpoint = useStorage('endpoint', import.meta.env.VITE_APP_BASE_URL)
  const accessToken = useStorage('accessToken', '')
  const latestVersion = ref<release>()
  const serverAvailable = ref(newPromiseLock<void>())
  const serverVersion = ref<version | null>()
  const status = ref<'checking' | 'pass' | 'fail'>('checking')
  const error = ref<Error | null>(null)
  const checkUpgradeError = ref<Error | null>(null)
  const setEndpoint = async (value: string) => {
    status.value = 'checking'
    endpoint.value = value
    const newVersion = newPromiseLock<void>()
    serverAvailable.value.resolve(newVersion)
    serverAvailable.value = newVersion
    try {
      serverVersion.value = await getVersion(value)
      serverAvailable.value.resolve()
      error.value = null
      status.value = 'pass'
      return true
    } catch (err) {
      error.value = err as Error
      status.value = 'fail'
      return false
    }
  }
  const setAccessToken = async (value: string) => {
    accessToken.value = value
    try {
      const latestRelease = await getLatestVersion()
      latestVersion.value = {
        tagName: latestRelease.tag_name,
        url: latestRelease.html_url
      }
    } catch (err) {
      checkUpgradeError.value = err as Error
      console.error('Failed to get version:', err)
    }
  }
  // init
  setEndpoint(endpoint.value)

  setTimeout(async () => setAccessToken(accessToken.value), 3000)
  return {
    endpoint: readonly(endpoint),
    serverAvailable: readonly(serverAvailable),
    serverVersion: readonly(serverVersion),
    loading: computed(() => status.value === 'checking'),
    error: readonly(error),
    checkUpgradeError: readonly(checkUpgradeError),
    accessToken: readonly(accessToken),
    latestVersion: readonly(latestVersion),
    setEndpoint,
    setAccessToken
  }
})
