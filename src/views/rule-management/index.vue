<template>
  <a-tabs default-active-key="ip">
    <a-tab-pane
      v-for="type in blackListTypes"
      :key="type"
      :title="t('page.rule_management.' + type)"
    >
      <genericBlackList :type="type" />
    </a-tab-pane>
    <a-tab-pane key="subscribe">
      <!-- todo 这里需要根据开启情况进行禁用，删掉router里面的判断代码-->
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
const { t } = useI18n()
type BlackListType = 'ip' | 'port' | 'asn' | 'region'
const blackListTypes: BlackListType[] = ['ip', 'port', 'asn', 'region']
</script>
