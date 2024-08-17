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
import BoardView from 'vue-2048/App.vue'
// import 'vue-2048/dist/style.css'

const { t } = useI18n()
</script>
