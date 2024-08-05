<template>
  <a-space direction="vertical" fill>
    <a-typography-text style="font-size: 1.2em">
      {{
        t('page.rule_management.generic.description', {
          type: t('page.rule_management.' + type)
        })
      }}
    </a-typography-text>
  </a-space>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { type ruleType } from '@/api/model/blacklist'
const { t } = useI18n()
const { type } = defineProps<{
  type: ruleType
}>()
</script>
