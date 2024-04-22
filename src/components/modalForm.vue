<template>
  <a-modal width="auto" v-model:visible="showModal" @ok="handleOk" @cancel="handleCancel">
    <template #title> 设置端点 </template>
    <a-form :model="form">
      <a-form-item field="endpoint" label="Endpoint:" validate-trigger="input">
        <a-input v-model="form.endpoint" placeholder="http://localhost:8989" allow-clear />
        <template #extra>
          <div>如果你无法访问PBH后端，可以尝试在此设置Endpoint</div>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { useEndpointStore } from '@/stores/endpoint'
import { ref, defineExpose } from 'vue'
const endPointStore = useEndpointStore()
const showModal = ref(false)
const form = ref({
  endpoint: endPointStore.endpoint
})
defineExpose({
  showModal: () => (showModal.value = true)
})
const handleOk = () => {
  endPointStore.setEndpoint(form.value.endpoint)
  showModal.value = false
}
const handleCancel = () => {
  showModal.value = false
  form.value.endpoint = ''
}
</script>
