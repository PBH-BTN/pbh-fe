<template>
  <!-- <a-skeleton :animation="true">
    <a-space direction="vertical" :style="{ width: '100%' }" size="large">
      <a-skeleton-line :rows="3" />
      <a-skeleton-shape />
    </a-space>
  </a-skeleton> -->
  <a-row justify="space-around">
    <a-col :span="4" v-for="client in data" :key="client.name">
      <a-card :style="{ width: '360px' }" title="下载器状态" hoverable>
        <a-typography>
          <a-tooltip :content="client.endpoint">
            <a-typography-paragraph style="font-size: 2em">
              <b>{{ client.name }}</b>
            </a-typography-paragraph>
          </a-tooltip>
          <a-typography-paragraph>
            状态： <component :is="statusMap.get(client.status)!![2]"></component
            ><a-typography-text :type="statusMap.get(client.status)!![0]">{{
              statusMap.get(client.status)!![1]
            }}</a-typography-text>
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
import { watch } from 'vue'
const statusMap = new Map([
  [ClientStatus.HEALTHY, ['success', '正常 - 状态良好', 'icon-check-circle-fill']],
  [
    ClientStatus.ERROR,
    ['warning', '错误 - 与客户端通信时出错，请检查日志文件', 'icon-close-circle-fill']
  ],
  [
    ClientStatus.UNKNOWN,
    ['danger', '未知 - PeerBanHelper 可能还没有与此客户端通信', 'icon-exclamation-circle-fill']
  ]
])
const autoUpdateState = useAutoUpdate()
const { data, loading, run, cancel } = useRequest(getClientStatus, {
  pollingWhenOffline: true,
  pollingInterval: 3000,
  onSuccess: () => autoUpdateState.setLastUpdate(new Date())
})
watch(autoUpdateState, (state) => {
  if (state.autoUpdate) {
    run()
  } else {
    cancel()
  }
})
</script>
