<template>
  <a-table stripe :columns="columns" :data="data?.data" :loading="loading">
    <template #ruleId="{ record }">
      <a-tag :color="getColor(record.ruleId)">{{ record.ruleId }}</a-tag>
    </template>
    <template #url="{ record }">
      <a-typography-text
        copyable
        :ellipsis="{
          showTooltip: true
        }"
      >
        {{ record.subUrl }}
      </a-typography-text>
    </template>
    <template #status="{ record }">
      <a-space>
        <a-switch
          v-model="record.enabled"
          :beforeChange="
            async (newStatus) => {
              const result = await ToggleRuleEnable(record.ruleId, newStatus as boolean)
              if (!result.success) {
                Message.error(result.message)
                return false
              }
              refresh()
              return true
            }
          "
        />
      </a-space>
    </template>
    <template #lastUpdated="{ record }">
      <a-typography-text>{{
        record.lastUpdate > 0
          ? d(record.lastUpdate, 'long')
          : t('page.ruleSubscribe.column.notUpdated')
      }}</a-typography-text>
    </template>
    <template #action="{ record }">
      <a-button class="edit-btn" shape="circle" type="text">
        <template #icon>
          <icon-edit />
        </template>
      </a-button>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import type { ruleBrief } from '@/api/model/ruleSubscribe'
import { getRuleList, ToggleRuleEnable } from '@/service/ruleSubscribe'
import { useRequest } from 'vue-request'
import { useI18n } from 'vue-i18n'
import { getColor } from '@/utils/color'
import { Message } from '@arco-design/web-vue'
const { t, d } = useI18n()
const { data, loading, refresh } = useRequest(getRuleList, {})
const columns = [
  {
    title: () => t('page.ruleSubscribe.column.status'),
    slotName: 'status'
  },
  {
    title: 'ID',
    slotName: 'ruleId'
  },
  {
    title: () => t('page.ruleSubscribe.column.ruleName'),
    dataIndex: 'ruleName'
  },
  {
    title: 'URL',
    slotName: 'url'
  },

  {
    title: () => t('page.ruleSubscribe.column.lastUpdated'),
    slotName: 'lastUpdated'
  },
  {
    title: () => t('page.ruleSubscribe.column.actions'),
    slotName: 'action'
  }
]
</script>
<style scoped>
.edit-btn {
  color: rgb(var(--gray-8));
  font-size: 16px;
}
</style>
