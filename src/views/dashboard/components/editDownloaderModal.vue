<template>
  <a-modal
    v-model:visible="showModal"
    :title="
      newItem ? t('page.dashboard.editModal.title.new') : t('page.dashboard.editModal.title.edit')
    "
    unmountOnClose
    @cancel="() => resetFields()"
    @before-ok="handleBeforeOk"
  >
    <a-form ref="formRef" :model="form" auto-label-width>
      <a-form-item field="config.type" :label="t('page.dashboard.editModal.label.type')" required>
        <a-radio-group v-model="form.config.type">
          <a-radio :value="ClientTypeEnum.qBittorrent">qBittorrent</a-radio>
          <a-radio :value="ClientTypeEnum.Transmission">Transmission</a-radio>
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
        <a-form-item field="config.password" :label="t('page.dashboard.editModal.label.password')">
          <a-input-password v-model="form.config.password" allow-clear></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model="useBasicAuth">
            {{ t('page.dashboard.editModal.label.useBasicAuth') }}</a-checkbox
          >
        </a-form-item>
        <a-form-item v-if="useBasicAuth" :content-flex="false">
          <a-form-item field="config.basicAuth.user" label="User">
            <a-input v-model="form.config.basicAuth.user" />
          </a-form-item>
          <a-form-item field="config.basicAuth.pass" label="Pass">
            <a-input-password v-model="form.config.basicAuth.pass" />
          </a-form-item>
        </a-form-item>
        <a-form-item
          field="config.httpVersion"
          :label="t('page.dashboard.editModal.label.httpVersion')"
        >
          <a-radio-group v-model="form.config.httpVersion">
            <a-radio value="HTTP_1_1">1.1</a-radio>
            <a-radio value="HTTP_2_0">2.0</a-radio>
          </a-radio-group>
          <template #extra
            >{{ t('page.dashboard.editModal.label.httpVersion.description') }}
          </template>
        </a-form-item>
        <a-form-item
          field="config.incrementBan"
          default-checked
          :label="t('page.dashboard.editModal.label.incrementBan')"
        >
          <a-switch v-model="form.config.incrementBan" />
          <template #extra>
            {{ t('page.dashboard.editModal.label.incrementBan.description') }}</template
          >
        </a-form-item>
        <a-form-item
          field="config.verifySsl"
          default-checked
          :label="t('page.dashboard.editModal.label.verifySsl')"
        >
          <a-switch v-model="form.config.verifySsl" />
        </a-form-item>
      </div>
      <!-- Transmission config block -->
      <div v-else-if="form.config.type === ClientTypeEnum.Transmission">
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
        <a-form-item field="config.password" :label="t('page.dashboard.editModal.label.password')">
          <a-input-password v-model="form.config.password" allow-clear></a-input-password>
        </a-form-item>
        <a-form-item field="config.rpcUrl" label="RPC URL">
          <a-input v-model="form.config.rpcUrl" allow-clear></a-input>
        </a-form-item>
        <a-form-item
          field="config.verifySsl"
          default-checked
          :label="t('page.dashboard.editModal.label.verifySsl')"
        >
          <a-switch v-model="form.config.verifySsl" />
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import { Message, type Form } from '@arco-design/web-vue'
import { ClientTypeEnum, type downloaderConfig } from '@/api/model/clientStatus'
import { CreateDownloader, TestDownloaderConfig, UpdateDownloader } from '@/service/downloaders'
const { t } = useI18n()
const showModal = ref(false)
const newItem = ref(false)
const useBasicAuth = ref(false)
const form = reactive({
  name: '',
  config: { basicAuth: {}, verifySsl: true, httpVersion: 'HTTP_1_1' } as downloaderConfig
})
const oldName = ref('')
defineExpose({
  showModal: (isNewItem: boolean, currentConfig?: { name: string; config: downloaderConfig }) => {
    newItem.value = isNewItem
    if (!isNewItem && currentConfig) {
      form.name = currentConfig.name
      oldName.value = currentConfig.name
      form.config = currentConfig.config
    }
    showModal.value = true
  }
})

const emits = defineEmits<{
  (e: 'changed'): void
}>()

const formRef = ref<InstanceType<typeof Form>>()
const handleBeforeOk = async () => {
  const validateError = await formRef.value?.validate()
  if (validateError) {
    return false
  }
  try {
    const testResult = await TestDownloaderConfig(form)
    if (!testResult.valid) {
      Message.error(testResult.message)
      return false
    }
    if (newItem.value) {
      // CreateDownloader
      const createResult = await CreateDownloader(form)
      if (createResult.code === 201) {
        Message.success(createResult.message)
        emits('changed')
        return true
      } else {
        Message.error(createResult.message)
        return false
      }
    } else {
      // UpdateDownloader
      const updateResult = await UpdateDownloader(oldName.value, form)
      if (updateResult.code === 200) {
        Message.success(updateResult.message)
        emits('changed')
        return true
      } else {
        Message.error(updateResult.message)
        return false
      }
    }
  } catch (e: any) {
    Message.error(e.message)
    return false
  }
}
const resetFields = () => {
  formRef.value?.resetFields()
  form.config = { basicAuth: {}, verifySsl: true, httpVersion: 'HTTP_1_1' } as downloaderConfig
}
</script>
