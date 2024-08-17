<template>
  <a-card hoverable title="2048">
    <vue2048 style="margin: 0 auto" />
    <template #extra>
      <a-tooltip :content="t('page.charts.tooltip.2048')">
        <icon-question-circle />
      </a-tooltip>
    </template>
  </a-card>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import vue2048 from 'vue-2048'

const { t } = useI18n()
</script>
