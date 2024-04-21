<template>
  <a-row justify="center">
    <a-col>
      <a-typography-text
        >Version: {{ data?.version }}({{ data?.commit.substring(0, 8) }})
      </a-typography-text>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { getVersion } from '@/service/version'
import { useRequest } from 'vue-request'

const { data } = useRequest(getVersion)
</script>
