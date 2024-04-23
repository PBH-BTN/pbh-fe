import 'normalize.css'
import './assets/main.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setGlobalOptions } from 'vue-request'

const app = createApp(App)

setGlobalOptions({
  loadingDelay: 400,
  loadingKeep: 1000,
  pollingWhenOffline: true
})

app.use(createPinia())
app.use(router)

app.mount('#app')
