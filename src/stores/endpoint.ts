import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getLatestVersion, getManifest } from '@/service/version'
import { computed, readonly, ref, type DeepReadonly } from 'vue'
import type { release } from '@/api/model/manifest'
import { IncorrectTokenError, login } from '@/service/login'
import { compare } from 'compare-versions'
import type { mainfest } from '@/api/model/manifest'

function newPromiseLock<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  const p = new Promise<T>((res) => (resolve = res))
  return Object.assign(p, { resolve })
}

export function isModuleEnable(
  mainfest: DeepReadonly<mainfest> | undefined | null,
  moduleName: string
) {
  if (!mainfest) return null
  return mainfest.modules.some((module) => module.className === moduleName)
}

export const useEndpointStore = defineStore('endpoint', () => {
  const endpoint = useStorage('endpoint', import.meta.env.VITE_APP_BASE_URL)
  const accessToken = useStorage('accessToken', '')
  const storageAuthToken = useStorage('authToken', '', undefined, { writeDefaults: false })
  const authToken = ref<string>(storageAuthToken.value)

  const latestVersion = ref<release>()
  const serverAvailable = ref(newPromiseLock<void>())
  const pushLock = () => {
    const lock = newPromiseLock<void>()
    serverAvailable.value.resolve(lock)
    serverAvailable.value = lock
    return lock
  }
  const serverManifest = ref<mainfest | null>()
  const status = ref<'checking' | 'needLogin' | 'pass' | 'fail' | 'needInit'>('checking')
  const error = ref<Error | null>(null)
  const checkUpgradeError = ref<Error | null>(null)

  const setAuthToken = async (token: string | null, rememberPassword = false) => {
    if (serverManifest.value && compare(serverManifest.value.version.version, '4.0.0', '<')) {
      // The old server does not support login
      return
    }
    if (token) authToken.value = token
    if (token && rememberPassword) {
      storageAuthToken.value = token
    }
    const isChecking = status.value === 'checking'
    if (!isChecking) {
      pushLock()
    }
    try {
      if (token) await login(token)
      if (!isChecking) {
        serverAvailable.value.resolve()
        error.value = null
        status.value = 'pass'
      }
    } catch (err) {
      if (!isChecking) {
        error.value = err as Error
        if (IncorrectTokenError.is(err)) {
          status.value = 'needLogin'
        }
      }
      throw err
    }
  }

  const setEndpoint = async (value: string) => {
    status.value = 'checking'
    endpoint.value = value
    pushLock()
    try {
      serverManifest.value = await getManifest(value)
      try {
        await setAuthToken(authToken.value)
      } catch (err) {
        if (IncorrectTokenError.is(err)) {
          status.value = 'needLogin'
        }
        throw err
      }
      serverAvailable.value.resolve()
      error.value = null
      status.value = 'pass'
      return true
    } catch (err) {
      error.value = err as Error
      if (status.value === 'checking') status.value = 'fail'
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
    serverManifest: readonly(serverManifest),
    loading: computed(() => status.value === 'checking'),
    status: readonly(status),
    error: readonly(error),
    checkUpgradeError: readonly(checkUpgradeError),
    accessToken: readonly(accessToken),
    latestVersion: readonly(latestVersion),
    setEndpoint,
    setAccessToken,
    authToken: readonly(authToken),
    setAuthToken,
    assertResponseLogin: (res: Response) => {
      if (res.status === 403) {
        setAuthToken(null)
        throw new IncorrectTokenError()
      } else if (res.status === 303) {
        status.value = 'needInit'
      }
    }
  }
})
