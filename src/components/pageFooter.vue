<template>
  <a-row align="center" justify="center">
    <a-col class="footer">
      <a-descriptions :column="{ xs: 1, md: 3, lg: 4 }">
        <a-descriptions-item label="Backend Version">
          {{ data?.version }} (<a-link
            :href="`https://github.com/Ghost-chu/PeerBanHelper/commit/${data?.commit}`"
            >{{ data?.commit.substring(0, 8) }} </a-link
          >)
        </a-descriptions-item>
        <a-descriptions-item label="WebUI Version">
          {{ version }} (<a-link :href="`https://github.com/Gaojianli/pbh-fe/commit/${hash}`">
            {{ hash.substring(0, 8) }} </a-link
          >)
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { getVersion } from '@/service/version'
import { useEndpointStore } from '@/stores/endpoint'
import { watch } from 'vue'
import { useRequest } from 'vue-request'
const version = __APP_VERSION__
const hash = __APP_HASH__
const endpointStore = useEndpointStore()
const { data, refresh } = useRequest(getVersion)

watch(() => endpointStore.endpoint, refresh)
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
}
</style>
