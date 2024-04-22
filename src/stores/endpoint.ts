import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useEndpointStore = defineStore('endpoint', () => {
  const endpoint = useStorage('endpoint', import.meta.env.VITE_APP_BASE_URL)
  return { endpoint }
})
