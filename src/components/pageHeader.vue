<template>
  <a-page-header title="PeerBanHelper" :show-back="false">
    <template #extra>
      <a-space class="right-side" wrap>
        <a-typography-text
          ><icon-clock-circle /> {{ $t('navbar.action.autoUpdate.lastUpdate')
          }}{{ autoUpdate.lastUpdate.toLocaleString(currentLocale) }}</a-typography-text
        >
        <a-switch v-model="autoUpdate.autoUpdate">
          <template #checked> {{ $t('navbar.action.autoUpdate.on') }} </template>
          <template #unchecked> {{ $t('navbar.action.autoUpdate.off') }} </template>
        </a-switch>
        <a-typography-text>{{ $t('navbar.action.autoUpdate') }}</a-typography-text>
        <div class="lang-selector">
          <a-tooltip :content="$t('settings.language')">
            <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setDropDownVisible">
              <template #icon>
                <icon-language />
              </template>
            </a-button>
          </a-tooltip>
          <a-dropdown trigger="click" @select="changeLocale">
            <div ref="triggerBtn" class="trigger-btn"></div>
            <template #content>
              <a-doption v-for="item in locales" :key="item.value" :value="item.value">
                <template #icon>
                  <icon-check v-show="item.value === currentLocale" />
                </template>
                {{ item.label }}
              </a-doption>
            </template>
          </a-dropdown>
        </div>
        <a-tooltip
          :content="
            isDark ? $t('settings.navbar.theme.toDark') : $t('settings.navbar.theme.toLight')
          "
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
          @click="showSettings"
        >
          <template #icon><icon-settings /></template>
        </a-button>
      </a-space>
    </template>
  </a-page-header>
  <modalForm ref="modal" :check-connection="checkBackendVaild" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useAutoUpdate } from '@/stores/autoUpdate'
import modalForm from './modalForm.vue'
import useLocale from '@/stores/locale'
import { LOCALE_OPTIONS } from '@/locale'
import axios, { AxiosError } from 'axios'
import { useEndpointStore } from '@/stores/endpoint'
import { Message } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'
const { changeLocale, currentLocale } = useLocale()
const locales = [...LOCALE_OPTIONS]
const modal = ref<InstanceType<typeof modalForm>>()
const { t } = useI18n()
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
const endpointStore = useEndpointStore()
const checkBackendVaild = async () => {
  await axios
    .get('/api/version', {
      baseURL: endpointStore.endpoint,
      timeout: 1000
    })
    .catch((err: AxiosError) => {
      Message.error(`${t('settings.endpoint.error')},error:${err.message}`)
      autoUpdate.autoUpdate = false
      modal.value?.setForce(true)
      showSettings()
      return err
    })
}
checkBackendVaild()
const triggerBtn = ref()
const setDropDownVisible = () => {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  })
  triggerBtn.value.dispatchEvent(event)
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
  .lang-selector {
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
