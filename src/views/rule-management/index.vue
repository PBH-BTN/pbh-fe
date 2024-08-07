<template>
  <a-tabs default-active-key="ip">
    <a-tab-pane v-for="type in blackListTypes" :key="type" :title="t('page.rule_management.' + type)">
      <genericBlackList :type="type" />
    </a-tab-pane>
    <a-tab-pane key="subscribe">
      <template #title>
        <a-space><icon-cloud />{{ t('page.rule_management.ruleSubscribe.title') }}</a-space>
      </template>
      <subscribeManagement />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import subscribeManagement from './components/subscribe/index.vue'
import genericBlackList from './components/generic/index.vue'
import { useI18n } from 'vue-i18n'
import type { ruleType } from '@/api/model/blacklist';
const { t } = useI18n()
const blackListTypes: ruleType[] = ['ip', 'port', 'asn', 'region', 'netType']
</script>
