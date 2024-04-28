import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import client from '@/api/client'

export const useEndpointStore = defineStore('endpoint', () => {
  const endpoint = useStorage('endpoint', import.meta.env.VITE_APP_BASE_URL)
  const setEndpoint = (value: string) => {
    endpoint.value = value
    client.defaults.baseURL = endpoint.value
  }
  return { endpoint, setEndpoint }
})
