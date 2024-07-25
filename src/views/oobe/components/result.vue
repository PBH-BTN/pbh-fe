<template>
  <a-spin v-if="loading" style="margin-top: 200px" :tip="t('page.oobe.result.initlizing')" />
  <div v-else>
    <a-result v-if="initSuccess" status="success" :title="t('page.oobe.result.title')" style="margin-top: 200px">
      <template #subtitle> {{ t('page.oobe.result.description') }} </template>
      <template #extra>
        <a-space>
          <a-button type="primary" href="/">{{ t('page.oobe.result.goto') }}</a-button>
        </a-space>
      </template>
    </a-result>
    <a-result v-else status="error" :title="t('page.oobe.result.title.error')" style="margin-top: 200px">
      <template #subtitle> {{ errorMsg }} </template>
      <template #extra>
        <a-space>
          <a-button type="primary" @click="init()">{{ t('page.oobe.result.retry') }}</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
<script lang="ts" setup>
import type { InitConfig } from '@/api/model/oobe'
import { InitPBH } from '@/service/init'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const config = defineModel<InitConfig>({ required: true })
const loading = ref(true)
const initSuccess = ref(false)
const errorMsg = ref('')
const init = () => {
  loading.value = true
  InitPBH({
    token: config.value.token,
    downloader: {
      name: config.value.downloaderConfig.name,
      config: config.value.downloaderConfig.config
    }
  })
    .then((res) => {
      if (res.code === 200 || res.code === 201) {
        initSuccess.value = true
      } else {
        errorMsg.value = res.message
      }
      loading.value = false
    })
    .catch((err: Error) => {
      errorMsg.value = err.message
      loading.value = false
    })
}
init()
</script>
