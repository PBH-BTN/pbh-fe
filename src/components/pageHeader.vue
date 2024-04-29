<template>
  <a-page-header title="PeerBanHelper" :show-back="false">
    <template #extra>
      <a-space class="right-side" wrap>
        <a-typography-text
          ><icon-clock-circle /> {{ t('navbar.action.autoUpdate.lastUpdate')
          }}{{ d(autoUpdate.lastUpdate, 'longlong') }}</a-typography-text
        >
        <a-switch v-model="autoUpdate.autoUpdate" />
        <a-typography-text>{{ t('navbar.action.autoUpdate') }}</a-typography-text>
        <div class="lang-selector">
          <a-dropdown
            trigger="click"
            @select="
              (lang: string | number | Record<string, any> | undefined) =>
                changeLocale(lang as string)
            "
          >
            <a-tooltip :content="t('settings.language')">
              <a-button class="nav-btn" type="outline" :shape="'circle'">
                <template #icon>
                  <icon-language />
                </template>
              </a-button>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in locales" :key="item.value" :value="item.value">
                <template #icon>
                  <icon-check v-show="item.value === locale" />
                </template>
                {{ item.label }}
              </a-doption>
            </template>
          </a-dropdown>
        </div>
        <a-tooltip
          :content="isDark ? t('settings.navbar.theme.toDark') : t('settings.navbar.theme.toLight')"
        >
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
          @click="settingsModalRef?.showModal"
        >
          <template #icon><icon-settings /></template>
        </a-button>
      </a-space>
    </template>
  </a-page-header>
  <settings-modal ref="settingsModalRef" />
</template>
<script setup lang="ts">
import settingsModal from './settingsModal.vue'
import { useDark, useToggle } from '@vueuse/core'
import { useAutoUpdate } from '@/stores/autoUpdate'
import useLocale from '@/stores/locale'
import { LOCALE_OPTIONS } from '@/locale'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
const { t, d, locale } = useI18n()
const { changeLocale } = useLocale()
const locales = [...LOCALE_OPTIONS]
const autoUpdate = useAutoUpdate()
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: null
})
const settingsModalRef = ref<InstanceType<typeof settingsModal>>()
const toggleTheme = useToggle(isDark)
const handleToggleTheme = () => {
  toggleTheme()
}
</script>
<style scoped lang="less">
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
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
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
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
./.vue
