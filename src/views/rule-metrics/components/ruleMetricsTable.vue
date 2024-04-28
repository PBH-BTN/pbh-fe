<template>
  <a-table
    :columns="columns"
    :data="data?.data"
    size="large"
    :loading="loading"
    column-resizable
    filter-icon-align-left
    :pagination="{ showPageSize: true }"
  >
    <template #empty> <a-empty /> </template>
    <template #type="{ record }">
      <a-tag :color="getColor(record.type)">{{ data?.dict[record.type] ?? record.type }}</a-tag>
    </template>
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
          <a-typography-text>{{ $t('page.ruleMetrices.metricsTable.filter') }}</a-typography-text>
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
import { useI18n } from 'vue-i18n'
const autoUpdateState = useAutoUpdate()
const { t } = useI18n()
const endpointStore = useEndpointStore()
const { data, refresh, loading } = useRequest(getRuleStatic, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
})

const hashString = (str: string) => {
  var hash = 0,
    i,
    chr
  if (str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
const getColor = (value: string) => {
  console.log(data.value?.dict[value])
  if (!data.value?.dict[value]) {
    return 'gray'
  }
  const hash = Math.abs(hashString(value)) % colorTable.length
  return colorTable[hash]
}

const columns = [
  {
    title: t('page.ruleMetrices.metricsTable.column.type'),
    slotName: 'type',
    width: 300
  },
  {
    title: t('page.ruleMetrices.metricsTable.column.type'),
    slotName: 'ruleName',
    width: 300
  },
  {
    title: t('page.ruleMetrices.metricsTable.column.run'),
    dataIndex: 'query',
    width: 300
  },
  {
    title: t('page.ruleMetrices.metricsTable.column.hit'),
    dataIndex: 'hit',
    filterable: {
      filter: (value: string, record: RuleMetric) => value[0] === 'yes' && record.hit > 0,
      slotName: 'hit-filter'
    }
  }
]

watch(() => endpointStore.endpoint, refresh, { immediate: true })

const colorTable = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta'
]
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
