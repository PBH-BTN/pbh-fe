<template>
  <a-table
    :stripe="true"
    :sticky-header="true"
    :columns="columns"
    :data="data"
    :loading="loading"
    :page-size="pageSize"
    :pagination="{ pageSize }"
  >
    <template
      #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }"
    >
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
    <template #pagination-left>
      <a-space>
        <p>每页数据数</p>
        <a-select v-model="pageSize" :trigger-props="{ autoFitPopupMinWidth: true }">
          <a-option :value="10">10</a-option>
          <a-option :value="20">20</a-option>
          <a-option :value="50">50</a-option>
          <a-option :value="100">100</a-option>
        </a-select>
      </a-space>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { getTopBan } from '@/service/topBan'
import { computed, ref, watch, h } from 'vue'
import { useRequest } from 'vue-request'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import type { topBanItem } from '@/api/model/topban'

const pageSize = ref(50)
const columns = [
  {
    title: 'IP地址',
    dataIndex: 'address',
    filterable: {
      filter: (value: string, record: topBanItem) => record.address.includes(value),
      slotName: 'name-filter',
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

const { data, loading, run, cancel, refresh } = useRequest(getTopBan, {
  defaultParams: [
    {
      num: topNumber.value
    }
  ]
})

watch(topNumber, () => {
  run({
    num: topNumber.value
  })
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
