<template>
  <a-row justify="space-around">
    <!-- 骨架屏 -->
    <a-col v-if="!firstLoad" :span="4">
      <a-card :style="{ width: '360px' }" hoverable>
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
    <a-col v-else :span="4" v-for="client in data" :key="client.name">
      <a-card :style="{ width: '360px' }" title="下载器状态" hoverable>
        <a-typography>
          <a-tooltip :content="client.endpoint">
            <a-typography-paragraph style="font-size: 2em">
              <b>{{ client.name }}</b>
            </a-typography-paragraph>
          </a-tooltip>
          <a-typography-paragraph>
            状态：
            <a-typography-text :type="statusMap.get(client.status)!![0]"
              ><icon-check-circle-fill v-if="client.status == ClientStatus.HEALTHY" />
              <icon-close-circle-fill v-if="client.status == ClientStatus.ERROR" />
              <icon-exclamation-circle-fill v-if="client.status == ClientStatus.UNKNOWN" />{{
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
import { ClientStatus } from '@/api/model/clientStatus'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useRequest } from 'vue-request'
import { watch, ref } from 'vue'
const statusMap = new Map([
  [ClientStatus.HEALTHY, ['success', '正常 - 状态良好']],
  [ClientStatus.ERROR, ['warning', '错误 - 与客户端通信时出错，请检查日志文件']],
  [ClientStatus.UNKNOWN, ['danger', '未知 - PeerBanHelper 可能还没有与此客户端通信']]
])
const firstLoad = ref(false)
const autoUpdateState = useAutoUpdate()
const { data, run, cancel } = useRequest(getClientStatus, {
  pollingWhenOffline: true,
  pollingInterval: 3000,
  onSuccess: () => {
    firstLoad.value = true
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
</script>
