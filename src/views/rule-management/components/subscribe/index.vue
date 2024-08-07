<template>
  <!-- Todo 这里需要使用 https://arco.design/vue/component/result#403 做一个开启性检查-->
  <a-space direction="vertical" fill>
    <a-typography-text style="font-size: 1.2em">
      {{ t('page.rule_management.ruleSubscribe.description') }}
    </a-typography-text>
    <subscribeList />
  </a-space>
</template>
<script lang="ts" setup>
import subscribeList from './ruleList.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
