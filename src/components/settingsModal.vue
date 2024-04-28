<template>
  <a-modal
    :width="800"
    v-model:visible="showModal"
    @ok="handleOk"
    @cancel="handleCancel"
    :closable="!forceModal"
    :maskClosable="!forceModal"
    :hide-cancel="forceModal"
    :ok-loading="loading"
  >
    <template #title> {{ $t('settings.modal.title') }} </template>
    <a-form :model="form" @submit="handleOk">
      <a-form-item
        field="endpoint"
        label="Endpoint:"
        :tooltip="t('settings.modal.endpointTips')"
        validate-trigger="input"
      >
        <a-input v-model="form.endpoint" placeholder="http://localhost:8989" allow-clear />
      </a-form-item>
      <a-form-item
        field="interval"
        :label="t('settings.modal.pollInterval')"
        validate-trigger="input"
      >
        <a-input-number v-model="form.interval" placeholder="3000" :min="100" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { Message } from '@arco-design/web-vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const endPointStore = useEndpointStore()
const autoUpdateState = useAutoUpdate()
const showModal = ref(false)
const loading = computed(() => endPointStore.loading)
const forceModal = computed(() => !!endPointStore.error)

const form = ref({
  endpoint: endPointStore.endpoint,
  interval: autoUpdateState.interval
})

const { t } = useI18n()
function initForm() {
  form.value.endpoint = endPointStore.endpoint
  form.value.interval = autoUpdateState.interval
}

defineExpose({
  showModal: () => {
    showModal.value = true
    initForm()
  }
})
const handleOk = () => {
  if (loading.value) return
  autoUpdateState.interval = form.value.interval
  endPointStore.setEndpoint(form.value.endpoint).then(() => {
    showModal.value = false
  })
}

watch(
  () => endPointStore.error,
  (error) => {
    if (error) {
      Message.error(`${t('settings.endpoint.error')},error:${error}`)
      if (!showModal.value) {
        showModal.value = true
        initForm()
      }
    }
  },
  { immediate: true }
)
const handleCancel = () => {
  showModal.value = false
  initForm()
}
</script>
