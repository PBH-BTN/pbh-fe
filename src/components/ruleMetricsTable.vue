<template>
  <a-table
    :columns="columns"
    :data="data"
    size="large"
    :loading="loading"
    column-resizable
    filter-icon-align-left
    :pagination="{ showPageSize: true }"
  >
    <template #empty> <a-empty /> </template>
    <template #ruleName="{ record }">
      <a-typography-text code>
        {{ record.metadata.rule }}
      </a-typography-text>
    </template>
    <template #hit-filter="{ filterValue, handleFilterConfirm, handleFilterReset }">
      <div class="search-box">
        <a-space>
          <a-switch
            v-model="filterValue[0]"
            checked-value="yes"
            unchecked-value="no"
            @change="
              (value: string) => (value === 'yes' ? handleFilterConfirm() : handleFilterReset())
            "
          />
          <a-typography-text>仅显示命中过的规则</a-typography-text>
        </a-space>
      </div>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { useRequest } from 'vue-request'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { computed, watch } from 'vue'
import { getRuleStatic } from '@/service/ruleStatics'
import type { RuleMetric } from '@/api/model/ruleStatics'
const autoUpdateState = useAutoUpdate()
const endpointStore = useEndpointStore()
const { data, refresh, loading } = useRequest(getRuleStatic, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
})

const columns = [
  {
    title: '规则类型',
    dataIndex: 'type',
    width: 600
  },
  {
    title: '规则名称',
    slotName: 'ruleName',
    width: 300
  },
  {
    title: '运行次数',
    dataIndex: 'query',
    width: 100
  },
  {
    title: '命中次数',
    dataIndex: 'hit',
    filterable: {
      filter: (value: string, record: RuleMetric) => value[0] === 'yes' && record.hit > 0,
      slotName: 'hit-filter'
    }
  }
]

watch(() => endpointStore.endpoint, refresh)
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
