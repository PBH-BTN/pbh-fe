<template>
  <a-typography-title :heading="3">下载器状态</a-typography-title>
  <a-row
    justify="start"
    wrap="true"
    :gutter="[
      { xs: 8, sm: 8, md: 8, lg: 24, xl: 32 },
      { xs: 8, sm: 8, md: 8, lg: 24, xl: 32 }
    ]"
  >
    <!-- 骨架屏 -->
    <a-col v-if="!data" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :xxl="4">
      <a-card hoverable>
        <a-skeleton :animation="true">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line />
            <a-skeleton-line />
            <a-skeleton-line />
            <a-skeleton-line />
          </a-space>
        </a-skeleton>
      </a-card>
    </a-col>
    <!-- client 卡片 -->
    <a-col
      v-else
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="6"
      :xxl="4"
      v-for="client in data"
      :key="client.name"
    >
      <a-card title="下载器状态" hoverable>
        <a-typography>
          <a-tooltip :content="client.endpoint">
            <a-typography-paragraph style="font-size: 2em">
              <b>{{ client.name }}</b>
            </a-typography-paragraph>
          </a-tooltip>
          <a-typography-paragraph>
            状态：
            <a-typography-text :type="statusMap.get(client.status)!![0]"
              ><icon-check-circle-fill v-if="client.status == ClientStatusEnum.HEALTHY" />
              <icon-close-circle-fill v-if="client.status == ClientStatusEnum.ERROR" />
              <icon-exclamation-circle-fill v-if="client.status == ClientStatusEnum.UNKNOWN" />{{
                statusMap.get(client.status)!![1]
              }}</a-typography-text
            >
          </a-typography-paragraph>

          <a-typography-paragraph> 活动种子数: {{ client.torrents }}</a-typography-paragraph>

          <a-typography-paragraph> 已连接的Peers: {{ client.peers }}</a-typography-paragraph>
        </a-typography>
      </a-card>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { getClientStatus } from '@/service/clientStatus'
import { ClientStatusEnum } from '@/api/model/clientStatus'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { useRequest } from 'vue-request'
import { computed, watch } from 'vue'
const statusMap = new Map([
  [ClientStatusEnum.HEALTHY, ['success', '正常 - 状态良好']],
  [ClientStatusEnum.ERROR, ['warning', '错误 - 与客户端通信时出错，请检查日志文件']],
  [ClientStatusEnum.UNKNOWN, ['danger', '未知 - PeerBanHelper 可能还没有与此客户端通信']]
])
const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const { data, refresh } = useRequest(getClientStatus, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
})

watch(() => endpointState.endpoint, refresh, { immediate: true })
</script>
