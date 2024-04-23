<template>
  <a-space direction="vertical" fill>
    <a-typography-title :heading="3">封禁名单</a-typography-title>
    <br />
    <a-space class="list-header" wrap>
      <a-typography-text>以下是封禁列表（按时间倒序排列）</a-typography-text>
      <a-input-search
        :style="{ width: '250px' }"
        placeholder="搜索 IP 地址"
        @search="handleSearch"
        allow-clear
        search-button
      />
    </a-space>
    <a-list
      :virtualListProps="{
        height: 500
      }"
      ref="banlist"
      max-height="1000"
      :data="list"
    >
      <template #item="{ item }">
        <a-list-item>
          <a-descriptions :column="{ xs: 1, md: 2, xl: 3 }">
            <template #title>
              <a-space wrap>
                <a-typography-text bold copyable>
                  {{ item.banMetadata.peer.address.ip }}:{{ item.banMetadata.peer.address.port }}
                </a-typography-text>
                <a-typography-text code>
                  {{ item.banMetadata.peer.clientName }}
                </a-typography-text>
              </a-space>
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
import { useRequest } from 'vue-request'
import { computed, ref, watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { getBanList } from '@/service/banList'
import { formatFileSize } from '@/utils/file'
const banlist = ref()
const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const { data, refresh } = useRequest(getBanList, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
})
const handleSearch = (value: string) => {
  if (value) {
    const index = data.value?.map((item) => item.address).findIndex((item) => item.includes(value))
    if (index !== -1) {
      banlist.value?.scrollIntoView({ index: index, align: 'auto' })
    }
  }
}

watch(() => endpointState.endpoint, refresh, { immediate: true })

const list = computed(() => data.value ?? [])
</script>

<style scoped lang="less">
.red {
  color: red;
}
.green {
  color: green;
}
.list-header {
  display: flex;
  justify-content: space-between;
}
</style>
