<template>
  <a-modal width="auto" v-model:visible="showModal" @ok="handleOk" @cancel="handleCancel">
    <template #title> 设置 </template>
    <a-form :model="form">
      <a-form-item field="endpoint" label="Endpoint:" validate-trigger="input">
        <a-input v-model="form.endpoint" placeholder="http://localhost:8989" allow-clear />
        <template #extra>
          <div>如果你无法访问PBH后端，可以尝试在此设置Endpoint</div>
        </template>
      </a-form-item>
      <a-form-item field="interval" label="轮询间隔:" validate-trigger="input">
        <a-input-number v-model="form.interval" placeholder="3000" :min="100" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { ref } from 'vue'
const endPointStore = useEndpointStore()
const autoUpdateState = useAutoUpdate()
const showModal = ref(false)
const form = ref({
  endpoint: endPointStore.endpoint,
  interval: autoUpdateState.interval
})

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
  endPointStore.endpoint = form.value.endpoint
  autoUpdateState.interval = form.value.interval
  showModal.value = false
}
const handleCancel = () => {
  showModal.value = false
  initForm()
}
</script>
