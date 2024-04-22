import 'normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { setGlobalOptions } from 'vue-request'

const app = createApp(App)

setGlobalOptions({
  loadingDelay: 400,
  loadingKeep: 1000,
  pollingWhenOffline: true,
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
