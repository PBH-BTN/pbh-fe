<template>
  <a-space direction="vertical" fill>
    <a-card :title="t('page.dashboard.statics.currentStatus')">
      <a-grid :cols="24" :row-gap="16" class="panel">
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.checked')"
            :value="data?.checkCounter"
            :value-from="data?.checkCounter"
            animation
            show-group-separator
          >
            <template #suffix>
              <a-typography-text
                >&nbsp;{{ $t('page.dashboard.statics.times') }}
              </a-typography-text></template
            >
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.banPeer')"
            :value="data?.peerBanCounter"
            :value-from="data?.peerBanCounter"
            animation
            show-group-separator
          >
            <template #suffix
              ><a-typography-text
                >&nbsp;{{ $t('page.dashboard.statics.times') }}
              </a-typography-text>
            </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.unbanPeer')"
            :value="data?.peerUnbanCounter"
            :value-from="data?.peerUnbanCounter"
            animation
            show-group-separator
          >
            <template #suffix>
              <a-typography-text>&nbsp;{{ $t('page.dashboard.statics.times') }} </a-typography-text>
            </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.currentBan')"
            :value="(data?.peerBanCounter ?? 0) - (data?.peerUnbanCounter ?? 0)"
            :value-from="(data?.peerBanCounter ?? 0) - (data?.peerUnbanCounter ?? 0)"
            animation
            show-group-separator
          >
            <template #suffix>
              <a-typography-text
                >&nbsp;{{ $t('page.dashboard.statics.number') }}
              </a-typography-text>
            </template>
          </a-statistic>
        </a-grid-item>
      </a-grid>
    </a-card>
  </a-space>
</template>
<script setup lang="ts">
import { useRequest } from 'vue-request'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { getStatistic } from '@/service/clientStatus'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const autoUpdateState = useAutoUpdate()
const endpointStore = useEndpointStore()
const { data, refresh } = useRequest(getStatistic, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
})

watch(() => endpointStore.endpoint, refresh, { immediate: true })
</script>
