<template>
  <a-space direction="vertical" fill>
    <a-typography-text style="font-size: 1.2em">
      {{ $t('page.banlog.description') }}
    </a-typography-text>
    <a-space class="align-right" fill style="margin-bottom: 20px">
      <a-typography-text>{{ t('page.banlog.radio.viewMode') }}</a-typography-text>
      <a-radio-group type="button" v-model="viewMode">
        <a-radio value="table">{{ t('page.banlog.radio.table') }}</a-radio>
        <a-radio value="charts">{{ t('page.banlog.radio.charts') }}</a-radio>
      </a-radio-group>
    </a-space>
    <banlogTable v-if="viewMode === 'table'" />
    <charts v-else-if="charts" />
  </a-space>
</template>

<style scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>

<script setup lang="ts">
import banlogTable from './components/banlogTable.vue'
const charts = defineAsyncComponent(() => import('./components/charts.vue'))
import { defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const viewMode = ref('table')
</script>
