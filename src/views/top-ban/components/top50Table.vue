<template>
  <a-table
    stripe
    sticky-header
    :columns="columns"
    :data="data"
    column-resizable
    :loading="loading"
    :pagination="{ showPageSize: true, baseSize: 4, bufferSize: 1 }"
    filter-icon-align-left
  >
    <template #ip-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
      <div class="search-box">
        <a-space direction="vertical">
          <a-input-search
            :model-value="filterValue[0]"
            :placeholder="t('page.topban.top50Table.searchPlaceholder')"
            allow-clear
            @search="handleFilterConfirm"
            @clear="handleFilterReset"
            @input="(value: string) => setFilterValue([value])"
          />
        </a-space>
      </div>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { getTopBan } from '@/service/topBan'
import { computed, watch, h } from 'vue'
import { useRequest } from 'vue-request'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import type { topBanItem } from '@/api/model/topban'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { useI18n } from 'vue-i18n'
import type { TableColumnData } from '@arco-design/web-vue'
const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const { t } = useI18n()
const columns: TableColumnData[] = [
  {
    title: () => t('page.topban.top50Table.column.ipaddress'),
    dataIndex: 'address',
    filterable: {
      filter: (value, record) => (record as topBanItem).address.includes(value[0]),
      slotName: 'ip-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: () => t('page.topban.top50Table.column.historyCount'),
    dataIndex: 'count'
  }
]

const props = defineProps({
  topNumber: {
    type: Number,
    required: true
  }
})

const topNumber = computed(() => props.topNumber)

const { data, loading, refresh } = useRequest(() => getTopBan(topNumber.value), {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate,
  cacheKey: () => `${endpointState.endpoint}-topban-${topNumber.value}`
})

watch([topNumber, () => endpointState.endpoint], () => {
  refresh()
})
</script>

<style scoped>
.search-box {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.search-box-footer {
  display: flex;
  justify-content: space-between;
}
</style>
