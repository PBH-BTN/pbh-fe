<template>
  <a-typography-title :heading="3">{{ t('page.dashboard.clientStatus.title') }}</a-typography-title>
  <a-row
    justify="start"
    align="stretch"
    :wrap="true"
    :gutter="[
      { xs: 8, sm: 8, md: 8, lg: 24, xl: 32 },
      { xs: 8, sm: 8, md: 8, lg: 24, xl: 32 }
    ]"
  >
    <!-- 骨架屏 -->
    <a-col v-if="!data || data?.length === 0" :xs="24" :sm="12" :md="8" :lg="6">
      <div class="card-wrap">
        <a-card hoverable>
          <template #title>
            <a-skeleton :animation="true">
              <a-space direction="vertical" :style="{ width: '100%' }" :size="0">
                <a-skeleton-line :line-height="44" :line-spacing="0" />
              </a-space>
            </a-skeleton>
          </template>
          <a-skeleton :animation="true">
            <a-space direction="vertical" :style="{ width: '100%' }" :size="0">
              <a-skeleton-line
                :rows="4"
                :line-height="22"
                :line-spacing="14"
                :widths="['60%', '70%', '50%', '60%']"
              />
            </a-space>
          </a-skeleton>
        </a-card>
      </div>
    </a-col>
    <!-- client 卡片 -->
    <a-col v-else :xs="24" :sm="12" :md="8" :lg="6" v-for="client in data" :key="client.name">
      <div class="card-wrap">
        <a-card hoverable>
          <template #title>
            <a-typography-title
              :style="{ marginBottom: '0px' }"
              :ellipsis="{
                rows: 2,
                showTooltip: true
              }"
            >
              {{ client.name }}
            </a-typography-title>
          </template>
          <a-descriptions :column="1" layout="inline-horizontal">
            <a-descriptions-item>
              <template #label>{{ t('page.dashboard.clientStatus.card.type') }}</template>
              <a-space>
                <a-tag bordered>{{ client.type }}</a-tag>
                <a-tooltip :content="client.endpoint">
                  <icon-info-circle size="large" />
                </a-tooltip>
              </a-space>
            </a-descriptions-item>

            <a-descriptions-item>
              <template #label>{{ t('page.dashboard.clientStatus.card.status') }}</template>
              <a-typography-text :type="getStatusSafe(client)[0]">
                <icon-check-circle-fill v-if="client.lastStatus == ClientStatusEnum.HEALTHY" />
                <icon-close-circle-fill v-if="client.lastStatus == ClientStatusEnum.ERROR" />
                <icon-exclamation-circle-fill
                  v-if="client.lastStatus == ClientStatusEnum.UNKNOWN"
                />
                {{ t(getStatusSafe(client)[1]) }}
              </a-typography-text>
            </a-descriptions-item>

            <a-descriptions-item v-if="client.lastStatus == ClientStatusEnum.HEALTHY">
              <template #label>{{
                t('page.dashboard.clientStatus.card.status.torrentNumber')
              }}</template>
              <a-space>
                <a-tag color="arcoblue" bordered>{{ client.activeTorrents }}</a-tag>
                <a-tooltip :content="t('page.dashboard.torrentList.tips')">
                  <a-button
                    @click="() => torrentList?.showModal(client.name)"
                    shape="circle"
                    type="text"
                    size="mini"
                  >
                    <template #icon>
                      <icon-eye size="large" />
                    </template>
                  </a-button>
                </a-tooltip>
              </a-space>
            </a-descriptions-item>

            <a-descriptions-item v-if="client.lastStatus == ClientStatusEnum.HEALTHY">
              <template #label>{{
                t('page.dashboard.clientStatus.card.status.peerNumber')
              }}</template>
              <a-tag color="arcoblue" bordered>{{ client.activePeers }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </div>
    </a-col>
  </a-row>
  <TorrentListModal ref="torrentList" />
</template>
<script setup lang="ts">
import { getClientStatus, getDownloaders } from '@/service/downloaders'
import { ClientStatusEnum, type ClientStatus } from '@/api/model/clientStatus'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { useRequest } from 'vue-request'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDownloader } from '@/stores/downloader'
import TorrentListModal from './torrentListModal.vue'
const { t } = useI18n()
const statusMap: Record<ClientStatusEnum, [string, string]> = {
  [ClientStatusEnum.HEALTHY]: ['success', 'page.dashboard.clientStatus.card.status.normal'],
  [ClientStatusEnum.ERROR]: ['warning', 'page.dashboard.clientStatus.card.status.error'],
  [ClientStatusEnum.UNKNOWN]: ['danger', 'page.dashboard.clientStatus.card.status.unknown']
}
const downloaderStore = useDownloader()

const getStatusSafe = (status: ClientStatus | undefined): string[] =>
  statusMap[status?.lastStatus ?? ClientStatusEnum.UNKNOWN] ?? statusMap[ClientStatusEnum.UNKNOWN]

const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
useRequest(getDownloaders, {
  onSuccess: (data) => {
    downloaderStore.updateDownloaders(data)
    run()
  },
  cacheKey: () => `${endpointState.endpoint}-downloader`
})
const { data, run, refresh } = useRequest(getClientStatus, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate,
  cacheKey: () => `${endpointState.endpoint}-clientStatus`
})

watch(() => endpointState.endpoint, refresh)

const torrentList = ref<InstanceType<typeof TorrentListModal>>()
</script>
<style scoped lang="less">
h1 {
  margin-top: 0;
}
button {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}
.card-wrap {
  height: 100%;
  ::v-deep(.arco-card) {
    height: 100%;
    .arco-card-header {
      height: auto;
    }
    .arco-card-body {
      .arco-descriptions {
        .arco-descriptions-body {
          .arco-descriptions-table {
            .arco-descriptions-row {
              .arco-descriptions-item {
                padding-bottom: 14px;
                .arco-descriptions-item-label {
                  padding-right: 10px;
                }
                .arco-descriptions-item-value {
                  .arco-space {
                    .arco-space-item {
                      .arco-btn-text {
                        color: var(--color-text-1);
                      }
                    }
                  }
                }
              }
              &:last-child .arco-descriptions-item {
                padding-bottom: 0px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
