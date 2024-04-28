import axios, { AxiosError } from 'axios'
import { useEndpointStore } from '@/stores/endpoint'
import { Message } from '@arco-design/web-vue'

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 3000
})

client.interceptors.request.use((config) => {
  const endpointStore = useEndpointStore()
  config.baseURL = endpointStore.endpoint
  return config
})

client.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response
    } else {
      Message.error('Request Error')
      return Promise.reject({
        message: 'Request Error',
        err: new Error(response.data)
      })
    }
  },
  (error: AxiosError) => {
    Message.error(`Request Error: ${error.message}`)
    return Promise.reject(error)
  }
)

export default client
