<template>
  <a-space direction="vertical" fill>
    <a-typography-title :heading="3">封禁名单</a-typography-title>
    <StatisticInfo />
    <a-list
      :virtualListProps="{
        height: 500
      }"
      max-height="1000"
      :data="list"
    >
      <template #item="{ item }">
        <a-list-item>
          <a-typography>
            <a-typography-paragraph>
              <a-typography-text bold>
                {{ item.banMetadata.peer.address.ip }}:{{ item.banMetadata.peer.address.port }}
              </a-typography-text>
              <a-typography-text code>
                {{ item.banMetadata.peer.clientName }}
              </a-typography-text>
            </a-typography-paragraph>
            <a-typography-paragraph>
              反向 DNS 解析：{{ item.banMetadata.reverseLookup }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              封禁时间：{{ new Date(item.banMetadata.banAt).toLocaleString('zh-cn') }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              预计解封时间：{{ new Date(item.banMetadata.unbanAt).toLocaleString('zh-cn') }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              发现位置：{{ item.banMetadata.torrent.name }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              封禁快照： <icon-arrow-up class="green" />
              {{ formatFileSize(item.banMetadata.peer.uploaded) }}
              <icon-arrow-down class="red" />
              {{ formatFileSize(item.banMetadata.peer.downloaded) }}
              - {{ (item.banMetadata.peer.progress * 100).toFixed(2) }}%
            </a-typography-paragraph>
            <a-typography-paragraph>
              封禁原因：{{ item.banMetadata.description }}
            </a-typography-paragraph>
          </a-typography>
        </a-list-item>
      </template>
    </a-list>
  </a-space>
</template>

<script setup lang="ts">
import StatisticInfo from './statisticInfo.vue'
import { useRequest } from 'vue-request'
import { computed, watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { getBanList } from '@/service/banList'
import { formatFileSize } from '@/utils/file'

const autoUpdateState = useAutoUpdate()
const { data, run, cancel } = useRequest(getBanList, {
  pollingWhenOffline: true,
  pollingInterval: 3000,
  onSuccess: () => {
    autoUpdateState.setLastUpdate(new Date())
  }
})
watch(autoUpdateState, (state) => {
  if (state.autoUpdate) {
    run()
  } else {
    cancel()
  }
})
const list = computed(() => data.value ?? [])
</script>

<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
</style>
