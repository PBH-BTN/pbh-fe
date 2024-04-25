<template>
  <a-layout>
    <a-layout-header>
      <a-page-header title="PeerBanHelper" :show-back="false">
        <template #extra>
          <a-space class="right-side" wrap>
            <a-typography-text
              ><icon-clock-circle /> 最后更新于：{{ autoUpdate.lastUpdate }}</a-typography-text
            >
            <a-switch v-model="autoUpdate.autoUpdate">
              <template #checked> 开 </template>
              <template #unchecked> 关 </template>
            </a-switch>
            <a-typography-text>自动刷新</a-typography-text>
            <a-tooltip :content="isDark ? '切换到浅色主题' : '切换到深色主题'">
              <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
                <template #icon>
                  <icon-moon-fill v-if="isDark" />
                  <icon-sun-fill v-else />
                </template>
              </a-button>
            </a-tooltip>
            <a-button
              class="nav-btn"
              type="outline"
              shape="circle"
              status="normal"
              @click="showSettings"
            >
              <template #icon><icon-settings /></template>
            </a-button>
          </a-space>
        </template>
      </a-page-header>
    </a-layout-header>
    <a-layout-content>
      <a-space direction="vertical" fill style="width: 100%; max-width: 1200px; margin: auto">
        <a-alert type="warning" closable
          >请注意，此功能仍在施工中，目前记录和展示的数据较为有限。</a-alert
        >
        <a-tabs default-active-key="dashboard" @change="goto" size="large">
          <a-tab-pane v-for="router in routers" :key="router.name" :title="router.meta?.label">
          </a-tab-pane>
        </a-tabs>
        <RouterView />
        <a-divider />
      </a-space>
    </a-layout-content>
    <a-layout-footer><pageFooter /></a-layout-footer>
  </a-layout>
  <modalForm ref="modal" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useViewRoute } from './router'
import { useAutoUpdate } from './stores/autoUpdate'
import pageFooter from './components/pageFooter.vue'
import modalForm from './components/modalForm.vue'
import { useDark, useToggle } from '@vueuse/core'
const [routers, , goto] = useViewRoute()
const modal = ref<InstanceType<typeof modalForm>>()
const autoUpdate = useAutoUpdate()
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light'
})

const toggleTheme = useToggle(isDark)
const handleToggleTheme = () => {
  toggleTheme()
}
const showSettings = () => {
  modal.value?.showModal()
}
</script>
<style scoped lang="less">
.right-side {
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
}
.arco-layout {
  padding: 0 24px;
  .arco-page-header {
    max-width: 1200px;
    margin: auto;
  }
  .arco-layout-header {
    :deep(.arco-page-header-wrapper) {
      padding: 0;
    }
  }
}
</style>
