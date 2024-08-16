<template>
  <a-card hoverable title="2048">
    <BoardView style="margin: 0 auto" />
    <template #extra>
      <a-tooltip :content="t('page.charts.tooltip.2048')">
        <icon-question-circle />
      </a-tooltip>
    </template>
  </a-card>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import './assets/scss/style.scss'
import './assets/scss/main.scss'
const { t } = useI18n()
import BoardView from './components/BoardView.vue'
</script>
