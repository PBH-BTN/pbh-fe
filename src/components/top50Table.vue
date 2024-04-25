<template>
  <a-table
    :stripe="true"
    :sticky-header="true"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="{ showPageSize: true }"
    :filter-icon-align-left="true"
  >
    <template #ip-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
      <div class="search-box">
        <a-space direction="vertical">
          <a-input-search
            :model-value="filterValue[0]"
            placeholder="搜索IP地址..."
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
const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const columns = [
  {
    title: 'IP地址',
    dataIndex: 'address',
    filterable: {
      filter: (value: string, record: topBanItem) => record.address.includes(value),
      slotName: '#ip-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '历史封禁次数',
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

const { data, loading, refresh } = useRequest(() => getTopBan({ num: topNumber.value }), {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
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
