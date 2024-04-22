<template>
  <a-modal v-model:visible="showModal" @ok="handleOk" @cancel="handleCancel">
    <template #title> Title </template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue'
const showModal = ref(false)
defineExpose({
  showModal: () => (showModal.value = true)
})
const handleOk = () => {
  showModal.value = false
}
const handleCancel = () => {
  showModal.value = false
}
</script>
