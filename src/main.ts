import 'normalize.css'
import './assets/main.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setGlobalOptions } from 'vue-request'
import { Message } from '@arco-design/web-vue'

const app = createApp(App)
Message._context = app._context

setGlobalOptions({
  loadingDelay: 400,
  loadingKeep: 1000,
  pollingWhenOffline: true
})

app.use(createPinia())
app.use(router)

app.mount('#app')
