<template>
  <a-config-provider :locale="ArcoI18nMessages[locale]">
    <a-layout>
      <a-layout-header>
        <pageHeader :disable-auto-update="disableAutoUpdate" />
      </a-layout-header>
      <a-layout-content v-if="status === 'needLogin'" class="login-page">
        <Login style="width: 100%; max-width: 1200px; margin: auto" />
      </a-layout-content>
      <a-layout-content v-else>
        <a-space direction="vertical" fill style="width: 100%; max-width: 1200px; margin: auto">
          <a-tabs
            :active-key="currentName"
            @change="goto"
            size="large"
            :animation="true"
            :destroy-on-hide="true"
            :lazy-load="true"
          >
            <a-tab-pane
              v-for="router in routers"
              :key="router.name"
              :title="t(String(router.meta?.label))"
            >
              <a-result
                status="error"
                :title="t('router.moduleNotEnable', { moduleName: t(String(router.meta?.label)) })"
                v-if="
                  router.meta?.moduleRequire &&
                  !isModuleEnable(endPointStore.serverManifest, String(router.meta?.moduleRequire))
                "
              >
                <template #subtitle>
                  <a-typography-text style="font-size: 0.8rem">{{
                    t('router.moduleNotEnable.tips')
                  }}</a-typography-text>
                </template>

                <template #extra>
                  <a-space>
                    <a-button :href="String(router.meta?.documentation)" type="primary">
                      {{ t('router.moduleNotEnable.viewDoc') }}
                    </a-button>
                  </a-space>
                </template>
              </a-result>
              <component v-else :is="router.component" />
            </a-tab-pane>
          </a-tabs>
          <a-divider />
        </a-space>
      </a-layout-content>
      <a-layout-footer><pageFooter /></a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>
<script setup lang="ts">
import { useViewRoute } from './router'
import pageFooter from './components/pageFooter.vue'
import pageHeader from './components/pageHeader.vue'
import { useI18n } from 'vue-i18n'
import { ArcoI18nMessages } from './locale'
import { useEndpointStore, isModuleEnable } from './stores/endpoint'
import { computed } from 'vue'
import Login from '@/views/login/index.vue'
import { useRoute } from 'vue-router'

const endPointStore = useEndpointStore()
const status = computed(() => endPointStore.status)
const route = useRoute()

const { t, locale } = useI18n()
const [routers, currentName, goto] = useViewRoute()

const disableAutoUpdate = computed(() => route.meta.disableAutoUpdate as boolean | undefined)
</script>

<style scoped lang="less">
.login-page {
  display: flex;
  flex-direction: column;
  &::after,
  &::before {
    content: '';
    display: block;
    flex: 1;
  }
  &::before {
    flex: 0.4;
  }
}
</style>
