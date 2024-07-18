<template>
    <a-row justify="center" style="margin-top: 2%;">
        <a-col :span="12">
            <a-space direction="vertical" style="display: flex;justify-content: center;">
                <a-steps changeable :current="current" @change="setCurrent">
                    <a-step v-for="setp of steps" v-bind:key="setp.title" :description="setp.description">{{
                        setp.title
                    }}</a-step>
                </a-steps>
                <div :style="{
                    width: '100%',
                    minHeight: '50vh',
                    textAlign: 'center',
                    background: 'var(--color-bg-2)',
                    color: '#C2C7CC',
                }">
                    <component :is="componentList[current - 1]" v-model="initConfig" />
                </div>
                <a-space size="large" style="display: flex;justify-content: center;">
                    <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
                        <IconLeft /> {{ t('page.oobe.action.back') }}
                    </a-button>
                    <a-button type="primary" :disabled="current >= 3" @click="onNext">
                        {{ t('page.oobe.action.next') }}
                        <IconRight />
                    </a-button>
                </a-space>
            </a-space>
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
import Welcomle from './components/welcome.vue'
import SetToken from './components/setToken.vue'
import AddDownloader from './components/addDownloader.vue'
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { type InitConfig } from '@/api/model/oobe';
import type { downloaderConfig } from '@/api/model/downloader';
const { t } = useI18n()
const current = ref(1)
const steps = computed(() => [
    {
        title: t('page.oobe.steps.welcome'),
        description: ''
    },
    {
        title: t('page.oobe.steps.setToken.description'),
        description: t('page.oobe.steps.setToken.description'),
    },
    {
        title: t('page.oobe.steps.addDownloader.title'),
        description: '',
    }
])

const initConfig = reactive<InitConfig>({
    token: "",
    downloaderConfig: {
        name: '',
        downloaderConfig: { basicAuth: {}, verifySsl: true, httpVersion: 'HTTP_1_1' } as downloaderConfig
    }
})



const componentList = [
    Welcomle,
    SetToken,
    AddDownloader
]


const onPrev = () => {
    current.value = Math.max(1, current.value - 1)
}

const onNext = () => {
    current.value = Math.min(3, current.value + 1)
}

const setCurrent = (cur: number) => {
    current.value = cur
}
</script>