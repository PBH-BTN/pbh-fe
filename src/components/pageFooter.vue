<template>
  <a-row align="center" justify="center">
    <a-col class="footer">
      <a-space direction="vertical" fill>
        <a-typography-text>
          Backend Version: {{ data?.version }} (
          <a :href="`https://github.com/Ghost-chu/PeerBanHelper/commit/${data?.commit}`"
            >{{ data?.commit.substring(0, 8) }}
          </a>
          )
        </a-typography-text>
        <a-typeography-text>
          WebUI Version: {{ version }} (
          <a :href="`https://github.com/Gaojianli/pbh-fe/commit/${hash}`">
            {{ hash.substring(0, 8) }}
          </a>
          )
        </a-typeography-text>
      </a-space>
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

watch(() => endpointStore.endpoint, refresh, { immediate: true })
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
  color: black;
  margin: 0px;
}
</style>
