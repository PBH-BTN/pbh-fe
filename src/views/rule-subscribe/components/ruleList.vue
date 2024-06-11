<template>
  <a-space direction="vertical" fill>
    <a-space class="align-right" fill>
      <a-button type="primary" @click="handleAdd">
        {{ $t('page.ruleSubscribe.addRule') }}
      </a-button>
      <a-button :loading="updateAllLoading" @click="handleUpdateAll">
        <template #icon> <icon-refresh /> </template>
        {{ t('page.ruleSubscribe.updateAll') }}
      </a-button>
    </a-space>
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
              async (newStatus: string | number | boolean) => {
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
      <template #rulesCount="{ record }">
        <a-typography-text>{{ record.enabled ? record.entCount : 'NaN' }}</a-typography-text>
      </template>
      <template #action="{ record }">
        <a-space warp>
          <a-tooltip :content="t('page.ruleSubscribe.column.actions.edit')" position="top" mini>
            <a-button class="edit-btn" shape="circle" type="text" @click="() => handleEdit(record)">
              <template #icon>
                <icon-edit />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip :content="t('page.ruleSubscribe.column.actions.update')" position="top" mini>
            <a-button
              class="edit-btn"
              shape="circle"
              type="text"
              @click="async () => handleRefresh(record.ruleId)"
            >
              <template #icon>
                <icon-refresh :spin="RefreshingStatusMap[record.ruleId]" />
              </template>
            </a-button>
          </a-tooltip>
          <a-popconfirm
            :content="t('page.ruleSubscribe.column.deleteConfirm')"
            type="warning"
            @before-ok="() => handleDelete(record.ruleId)"
          >
            <a-button class="edit-btn" status="danger" shape="circle" type="text">
              <template #icon>
                <icon-delete />
              </template>
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
    <editRuleModal ref="editModal" />
  </a-space>
</template>
<script setup lang="ts">
import {
  DeleteRule,
  getRuleList,
  RefreshRule,
  ToggleRuleEnable,
  UpdateAll
} from '@/service/ruleSubscribe'
import type { ruleBrief } from '@/api/model/ruleSubscribe'
import editRuleModal from './editRuleItemModal.vue'
import { useRequest } from 'vue-request'
import { useI18n } from 'vue-i18n'
import { getColor } from '@/utils/color'
import { Message } from '@arco-design/web-vue'
import { ref } from 'vue'
const { t, d } = useI18n()
const RefreshingStatusMap = ref<Record<string, boolean>>({})
const { data, loading, refresh } = useRequest(getRuleList, {})
const editModal = ref<InstanceType<typeof editRuleModal>>()
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
    title: () => t('page.ruleSubscribe.column.rulesCount'),
    slotName: 'rulesCount'
  },
  {
    title: () => t('page.ruleSubscribe.column.actions'),
    slotName: 'action'
  }
]
const handleEdit = (record: ruleBrief) => {
  editModal.value?.showModal(false, () => refresh(), record)
}
const handleAdd = () => {
  editModal.value?.showModal(true, () => refresh())
}
const handleRefresh = (ruleId: string) => {
  RefreshingStatusMap.value[ruleId] = true
  RefreshRule(ruleId).then((result) => {
    if (!result.success) {
      Message.error(result.message)
    } else {
      Message.info(result.message)
    }
    RefreshingStatusMap.value[ruleId] = false
    refresh()
  })
}
const handleDelete = async (ruleId: string) => {
  const result = await DeleteRule(ruleId)
  if (!result.success) {
    Message.error(result.message)
  } else {
    Message.success(result.message)
  }
  refresh()
  return true
}

const updateAllLoading = ref(false)
const handleUpdateAll = async () => {
  updateAllLoading.value = true
  const result = await UpdateAll()
  if (!result.success) {
    Message.error(result.message)
  } else {
    Message.success(result.message)
  }
  refresh()
  updateAllLoading.value = false
}

defineExpose({
  handleAdd,
  handleUpdateAll,
  updateAllLoading
})
</script>
<style scoped>
.edit-btn {
  color: rgb(var(--gray-8));
  font-size: 16px;
}
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
