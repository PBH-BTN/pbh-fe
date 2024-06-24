<template>
  <a-modal
    v-model:visible="showModal"
    :title="
      newItem ? t('page.dashboard.editModal.title.new') : t('page.dashboard.editModal.title.edit')
    "
    unmountOnClose
    @before-ok="handleBeforeOk"
  >
    <a-form ref="formRef" :model="form" auto-label-width>
      <a-form-item field="config.type" :label="t('page.dashboard.editModal.label.type')" required>
        <a-radio-group v-model="form.config.type">
          <a-radio value="qBittorrent">qBittorrent</a-radio>
          <a-radio value="Transmission">Transmission</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item field="name" :label="t('page.dashboard.editModal.label.name')" required>
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <!-- qBittorrent config block -->
      <div v-if="form.config.type === ClientTypeEnum.qBittorrent">
        <a-form-item
          field="config.endpoint"
          :label="t('page.dashboard.editModal.label.endpoint')"
          :rules="[{ required: true, type: 'url' }]"
        >
          <a-input v-model="form.config.endpoint" allow-clear></a-input>
        </a-form-item>
        <a-form-item field="config.username" :label="t('page.dashboard.editModal.label.username')">
          <a-input v-model="form.config.username" allow-clear></a-input>
        </a-form-item>
        <a-form-item field="config.username" :label="t('page.dashboard.editModal.label.password')">
          <a-input-password v-model="form.config.password" allow-clear></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model="useBasicAuth">
            {{ t('page.dashboard.editModal.label.useBasicAuth') }}</a-checkbox
          >
        </a-form-item>
        <a-form-item :content-flex="false">
          <a-form-item field="config.basicAuth.user" label="User">
            <a-input v-model="form.config.basicAuth.user" />
          </a-form-item>
          <a-form-item field="config.basicAuth.pass" label="Pass">
            <a-input v-model="form.config.basicAuth.pass" />
          </a-form-item>
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import { Message, type FieldRule, type Form } from '@arco-design/web-vue'
import { ClientTypeEnum, type downloaderConfig } from '@/api/model/clientStatus'
const { t } = useI18n()
const showModal = ref(false)
const newItem = ref(false)
const useBasicAuth = ref(false)
const form = reactive({
  name: '',
  config: {} as downloaderConfig
})
let callbackFn: ((record: Partial<downloaderConfig>) => void) | undefined
defineExpose({
  showModal: (
    isNewItem: boolean,
    finishedCallback?: (record: Partial<downloaderConfig>) => void,
    name?: string
  ) => {
    newItem.value = isNewItem
    callbackFn = finishedCallback
    showModal.value = true
  }
})
const formRef = ref<InstanceType<typeof Form>>()
const handleBeforeOk = async () => {
  const validateError = await formRef.value?.validate()
  if (validateError) {
    return false
  }
}
</script>
