import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEndpointStore = defineStore(
  'endpoint',
  () => {
    const endpoint = ref(import.meta.env.VITE_APP_BASE_URL ?? '')
    const setEndpoint = (url: string) => {
      endpoint.value = url
    }
    return { endpoint, setEndpoint }
  },
  { persist: true }
)
