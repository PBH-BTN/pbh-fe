<template>
  <a-result status="success" :title="t('page.oobe.success.title')" style="margin-top: 200px">
    <template #subtitle> {{ t('page.oobe.success.description') }} </template>
    <template #extra>
      <a-space>
        <a-button type="primary" href="/">{{ t('page.oobe.success.goto') }}</a-button>
      </a-space>
    </template>
  </a-result>
</template>
<script lang="ts" setup>
import type { InitConfig } from '@/api/model/oobe'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const config = defineModel<InitConfig>({ required: true })
console.log(JSON.stringify(config.value))
</script>
