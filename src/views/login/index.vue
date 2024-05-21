<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="token"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'input']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.token"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link
            href="https://github.com/PBH-BTN/PeerBanHelper/wiki/%E5%A6%82%E4%BD%95%E9%87%8D%E7%BD%AEToken"
            >{{ $t('login.form.forgetPassword') }}</a-link
          >
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { ref, reactive, computed } from 'vue'
import { type ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { Message } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'
import { login } from '@/service/login'
import { useViewRoute } from '@/router'
import { useEndpointStore } from '@/stores/endpoint'

const endpointStore = useEndpointStore()
const { t } = useI18n()
const loading = ref(false)
const [, , goto] = useViewRoute()
const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  token: ''
})
const userInfo = reactive({ token: loginConfig.value.token })
const setRememberPassword = (value: boolean) => {
  loginConfig.value.rememberPassword = value
}
const loginError = ref<Error>()
const errorMessage = computed(() =>
  loginError.value ? `${t('login.form.login.failed')}  ${loginError.value.message}` : ''
)
const handleSubmit = async ({
  errors,
  values
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) => {
  if (loading.value) return
  if (errors) {
    console.log(errors)
    return
  }
  try {
    await login(userInfo.token)
    endpointStore.setAuthToken(userInfo.token)
    goto('dashboard')
    Message.success(t('login.form.login.success'))
    const { rememberPassword } = loginConfig.value
    const { token } = values
    loginConfig.value.token = rememberPassword ? token : ''
  } catch (err) {
    loginError.value = err as Error
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
