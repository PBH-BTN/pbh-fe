<template>
  <a-row align="center" justify="center">
    <a-col class="footer">
      <a-descriptions :column="{ xs: 1, md: 3, lg: 4 }">
        <a-descriptions-item label="Backend Version">
          <a-space>
            <a
              v-if="hasNewVersion"
              :href="latestVersion?.url"
              :title="t('footer.newVersionTips', { version: latestVersion?.tagName })"
            >
              <a-badge dot :count="1" :offset="[8, -1]">
                {{ serverVersion?.version }}
              </a-badge>
            </a>
            <div v-else>{{ serverVersion?.version }}</div>
            <div
              v-if="endpointStore.plusStatus?.activated"
              class="gold"
              @click="plusInfo?.showModal()"
            >
              <span>PLUS</span>
            </div>
            <div>
              (<a-link
                :href="`https://github.com/Ghost-chu/PeerBanHelper/commit/${serverVersion?.commit}`"
                >{{ serverVersion?.commit.substring(0, 8) }} </a-link
              >)
            </div>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="WebUI Version">
          <a-space>
            {{ version }}
            <div>
              (<a-link :href="`https://github.com/Gaojianli/pbh-fe/commit/${hash}`">
                {{ hash.substring(0, 8) }} </a-link
              >)
            </div></a-space
          >
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
  </a-row>
  <plusModal ref="plusInfo" />
</template>

<script setup lang="ts">
import { useEndpointStore } from '@/stores/endpoint'
import { Button, Message, Notification } from '@arco-design/web-vue'
import { computed, h, ref, watch } from 'vue'
import { compare } from 'compare-versions'
import { useI18n } from 'vue-i18n'
import plusModal from './plusModal.vue'
const { t } = useI18n()
const version = __APP_VERSION__
const hash = __APP_HASH__
const endpointStore = useEndpointStore()
const serverVersion = computed(() => endpointStore.serverManifest?.version)
const latestVersion = computed(() => endpointStore.latestVersion)
const hasNewVersion = computed(() => {
  return compare(
    endpointStore.latestVersion?.tagName ?? '1.0',
    endpointStore.serverManifest?.version.version ?? '1.0',
    '>'
  )
})
watch(hasNewVersion, () => {
  if (hasNewVersion.value) {
    Notification.info({
      title: t('footer.newVersion'),
      content: t('footer.newVersion.body', { version: latestVersion.value?.tagName }),
      footer: () =>
        h(Button, { href: latestVersion.value?.url, type: 'primary' }, [
          t('footer.newVersion.updateNow')
        ]),
      duration: 5000,
      closable: true
    })
  }
})

watch(
  () => endpointStore.checkUpgradeError,
  (error) => {
    Message.error(`${t('settings.accessToken.error')},error:${error}`)
  }
)

const plusInfo = ref<InstanceType<typeof plusModal>>()
endpointStore.emmitter.on('open-plus-modal', () => {
  plusInfo.value?.showModal()
})
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
}
.gold {
  background: linear-gradient(
    135deg,
    #c7aa68,
    #ce9f4f,
    #d0b15e,
    #fff6c5,
    #d0b15e,
    #ce9f4f,
    #c7aa68
  );
  background-size: 100%;
  background-position: 50% 50%;
  border-radius: 6px;
  padding-left: 5px;
  padding-right: 6px;
  cursor: pointer;
}
.gold > span {
  font-size: 13px;
  text-align: center;
  color: black;
  font-weight: bold;
  font-style: italic;
  font-family: 'Impact';
}
</style>
