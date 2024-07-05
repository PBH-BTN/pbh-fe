<template>
  <a-form-item
    field="config.endpoint"
    :label="t('page.dashboard.editModal.label.endpoint')"
    :rules="[{ required: true, type: 'url' }]"
  >
    <a-input v-model="config.endpoint" allow-clear></a-input>
  </a-form-item>
  <a-form-item field="config.token" label="Token" required>
    <a-input v-model="config.token" allow-clear></a-input>
  </a-form-item>
  <a-form-item field="config.httpVersion" :label="t('page.dashboard.editModal.label.httpVersion')">
    <a-radio-group v-model="config.httpVersion">
      <a-radio value="HTTP_1_1">1.1</a-radio>
      <a-radio value="HTTP_2_0">2.0</a-radio>
    </a-radio-group>
    <template #extra>{{ t('page.dashboard.editModal.label.httpVersion.description') }} </template>
  </a-form-item>
  <a-form-item
    field="config.verifySsl"
    default-checked
    :label="t('page.dashboard.editModal.label.verifySsl')"
  >
    <a-switch v-model="config.verifySsl" />
  </a-form-item>
</template>
<script setup lang="ts">
import type { biglybtConfig } from '@/api/model/downloader'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const config = defineModel<biglybtConfig>({ required: true })
</script>
