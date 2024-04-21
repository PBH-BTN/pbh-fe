<template>
  <a-layout>
    <a-layout>
      <a-layout-header>
        <a-page-header
          :style="{ background: 'var(--color-bg-2)' }"
          title="PeerBanHelper"
          :show-back="false"
        >
          <template #extra>
            <a-space size="large">
              <a-space>
                <p><icon-clock-circle />最后更新于：{{ autoUpdate.lastUpdate }}</p>
                <a-switch v-model="autoUpdate.autoUpdate" @change="autoUpdate.toggleAutoUpdate">
                  <template #checked> 开 </template>
                  <template #unchecked> 关 </template>
                </a-switch>
                <p>自动刷新</p>
              </a-space>
              <a-radio-group type="button" :model-value="currentName" @change="goto">
                <a-radio v-for="router in routers" :key="router.name" :value="router.name">
                  {{ router.meta?.label }}
                </a-radio>
              </a-radio-group>
            </a-space>
          </template>
        </a-page-header>
      </a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-space direction="vertical" fill>
          <a-alert type="warning" closable
            >请注意，此功能仍在施工中，目前记录和展示的数据较为有限。</a-alert
          >
          <a-divider />
          <a-layout-content><RouterView /></a-layout-content>
          <a-layout-footer><pageFooter /></a-layout-footer>
        </a-space>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useViewRoute } from './router'
import { useAutoUpdate } from './stores/autoUpdate'
import pageFooter from './components/pageFooter.vue'
const [routers, currentName, goto] = useViewRoute()
const autoUpdate = useAutoUpdate()
watch(currentName, (val) => console.log('currentName', val))
</script>
<style scoped></style>
