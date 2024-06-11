<template>
  <a-space direction="vertical" fill>
    <a-typography-text style="font-size: 1.2em">
      {{ t('page.ruleSubscribe.description') }}
    </a-typography-text>
    <ruleList />
  </a-space>
</template>

<script setup lang="ts">
import ruleList from './components/ruleList.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
