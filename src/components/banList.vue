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
          <a-descriptions :column="{ xs: 1, md: 2, xl: 3 }">
            <template #title>
              <a-typography-paragraph>
                <a-typography-text bold copyable>
                  {{ item.banMetadata.peer.address.ip }}:{{ item.banMetadata.peer.address.port }}
                </a-typography-text>
                &nbsp;
                <a-typography-text code>
                  {{ item.banMetadata.peer.clientName }}
                </a-typography-text>
              </a-typography-paragraph>
            </template>
            <a-descriptions-item label="反向 DNS 解析" :span="1">
              {{ item.banMetadata.reverseLookup }}
            </a-descriptions-item>
            <a-descriptions-item label="封禁时间" :span="1">
              {{ new Date(item.banMetadata.banAt).toLocaleString('zh-cn') }}
            </a-descriptions-item>
            <a-descriptions-item label="预计解封时间" :span="1">
              {{ new Date(item.banMetadata.unbanAt).toLocaleString('zh-cn') }}
            </a-descriptions-item>
            <a-descriptions-item label="发现位置" :span="2">
              {{ item.banMetadata.torrent.name }}
            </a-descriptions-item>
            <a-descriptions-item label="封禁快照" :span="1">
              <icon-arrow-up class="green" />
              {{ formatFileSize(item.banMetadata.peer.uploaded) }}
              <icon-arrow-down class="red" />
              {{ formatFileSize(item.banMetadata.peer.downloaded) }}
              - {{ (item.banMetadata.peer.progress * 100).toFixed(2) }}%
            </a-descriptions-item>
            <a-descriptions-item label="封禁原因" :span="3">
              {{ item.banMetadata.description }}
            </a-descriptions-item>
          </a-descriptions>
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
import { useEndpointStore } from '@/stores/endpoint'
import { getBanList } from '@/service/banList'
import { formatFileSize } from '@/utils/file'

const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const { data, refresh } = useRequest(getBanList, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
})

watch(() => endpointState.endpoint, refresh, { immediate: true })

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
