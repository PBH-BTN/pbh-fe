<template>
  <a-modal
    :width="800"
    v-model:visible="showModal"
    @ok="handleOk"
    @cancel="handleCancel"
    :closable="!forceModal"
    :hide-cancel="forceModal"
  >
    <template #title> {{ $t('settings.modal.title') }} </template>
    <a-form :model="form">
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const endPointStore = useEndpointStore()
const autoUpdateState = useAutoUpdate()
const showModal = ref(false)
const forceModal = ref(false)

const form = ref({
  endpoint: endPointStore.endpoint,
  interval: autoUpdateState.interval
})

const { t } = useI18n()
function initForm() {
  form.value.endpoint = endPointStore.endpoint
  form.value.interval = autoUpdateState.interval
}
const setForce = (value: boolean) => {
  forceModal.value = value
}
const props = defineProps<{ checkConnection: () => Promise<void> }>()

defineExpose({
  showModal: () => {
    showModal.value = true
    initForm()
  },
  setForce
})
const handleOk = () => {
  endPointStore.setEndpoint(form.value.endpoint)
  autoUpdateState.interval = form.value.interval
  props
    .checkConnection()
    .then(() => {
      showModal.value = false
      setForce(false)
    })
    .catch(() => {
      showModal.value = true
      setForce(true)
    })
}
const handleCancel = () => {
  showModal.value = false
  initForm()
}
</script>
