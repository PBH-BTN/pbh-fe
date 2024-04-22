<template>
  <a-layout>
    <a-layout>
      <a-layout-header>
        <a-page-header
          :style="{ background: 'var(--color-bg-2)', maxWidth: '1200px', margin: 'auto' }"
          title="PeerBanHelper"
          :show-back="false"
        >
          <template #extra>
            <ul class="right-side">
              <li>
                <a-space>
                  <a-typography-text
                    ><icon-clock-circle />最后更新于：{{ autoUpdate.lastUpdate }}</a-typography-text
                  >
                  <a-switch v-model="autoUpdate.autoUpdate">
                    <template #checked> 开 </template>
                    <template #unchecked> 关 </template>
                  </a-switch>
                  <a-typography-text>自动刷新</a-typography-text>
                </a-space>
              </li>
              <li>
                <a-button
                  class="nav-btn"
                  type="outline"
                  shape="circle"
                  status="normal"
                  @click="showSettings"
                >
                  <template #icon><icon-settings /></template>
                </a-button>
              </li>
              <li>
                <a-tooltip :content="theme === 'light' ? '切换到深色主题' : '切换到浅色主题'">
                  <a-button
                    class="nav-btn"
                    type="outline"
                    :shape="'circle'"
                    @click="handleToggleTheme"
                  >
                    <template #icon>
                      <icon-moon-fill v-if="theme === 'dark'" />
                      <icon-sun-fill v-else />
                    </template>
                  </a-button>
                </a-tooltip>
              </li>
              <li>
                <a-radio-group type="button" :model-value="currentName" @change="goto">
                  <a-radio v-for="router in routers" :key="router.name" :value="router.name">
                    {{ router.meta?.label }}
                  </a-radio>
                </a-radio-group>
              </li>
            </ul>
          </template>
        </a-page-header>
      </a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-space direction="vertical" fill style="width: 100%; max-width: 1200px; margin: auto">
          <a-alert type="warning" closable
            >请注意，此功能仍在施工中，目前记录和展示的数据较为有限。</a-alert
          >
          <a-divider />
          <a-layout-content><RouterView /></a-layout-content>
          <a-divider />
          <a-layout-footer><pageFooter /></a-layout-footer>
        </a-space>
      </a-layout>
    </a-layout>
  </a-layout>
  <modalForm ref="modal" />
</template>
<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useViewRoute } from './router'
import { useAutoUpdate } from './stores/autoUpdate'
import pageFooter from './components/pageFooter.vue'
import modalForm from './components/modalForm.vue'
import { useDark, useToggle } from '@vueuse/core'
import { useThemeStore } from './stores/theme'
const [routers, currentName, goto] = useViewRoute()
const modal = ref<InstanceType<typeof modalForm>>()
const autoUpdate = useAutoUpdate()
const themeStore = useThemeStore()
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    // overridden default behavior
    themeStore.toggleTheme(dark)
  }
})

const theme = computed(() => {
  return themeStore.theme
})
const toggleTheme = useToggle(isDark)
const handleToggleTheme = () => {
  toggleTheme()
}
const showSettings = () => {
  modal.value?.showModal()
}
watch(currentName, (val) => console.log('currentName', val))
</script>
<style scoped lang="less">
.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
}
</style>
