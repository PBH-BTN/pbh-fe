<template>
  <a-result status="error" :title="t('page.ruleSubscribe.notEnable')" v-if="!enableRule">
    <template #subtitle>
      <a-typography-text style="font-size: 0.8rem">{{
        t('page.ruleSubscribe.notEnable.tips')
      }}</a-typography-text>
    </template>

    <template #extra>
      <a-space>
        <a-button
          href="https://github.com/PBH-BTN/PeerBanHelper/wiki/%E8%A7%84%E5%88%99%E8%AE%A2%E9%98%85%E5%8A%9F%E8%83%BD"
          type="primary"
        >
          {{ t('page.ruleSubscribe.notEnable.viewDoc') }}
        </a-button>
      </a-space>
    </template>
  </a-result>
  <ruleList v-else />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ruleList from './components/ruleList.vue'
import { useEndpointStore } from '@/stores/endpoint'
import { isEnableSubscribe } from '@/service/modules/subscribe'
const { t } = useI18n()
const endPointStore = useEndpointStore()
const enableRule = isEnableSubscribe(endPointStore.serverManifest?.modules)
</script>
