<template>
  <div style="display: flex; align-items: center; flex-flow: column">
    <a-space direction="vertical">
      <a-card hoverable :title="t('page.banlog.charts.options.field.' + option.field)">
        <v-chart
          class="chart"
          :option="pieChartOption"
          :loading="loading"
          autoresize
          :loadingOptions="loadingOptions"
          :theme="darkStore.isDark ? 'dark' : 'light'"
          :init-options="{ renderer: 'svg' }"
        >
        </v-chart>
        <template #extra>
          <a-popover>
            <a-link>{{ t('page.banlog.charts.options.more') }}</a-link>
            <template #content>
              <a-form :model="option" style="width: 25vh">
                <a-form-item field="field" :label="t('page.banlog.charts.options.field')">
                  <a-select v-model="option.field" :trigger-props="{ autoFitPopupMinWidth: true }">
                    <a-option value="peerId">
                      {{ t('page.banlog.charts.options.field.peerId') }}
                    </a-option>
                    <a-option value="torrentName">
                      {{ t('page.banlog.charts.options.field.torrentName') }}
                    </a-option>
                    <a-option value="module">
                      {{ t('page.banlog.charts.options.field.module') }}
                    </a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="enableThreshold">
                  <a-space>
                    <a-switch v-model="option.enableThreshold" />
                    <a-typography-text>{{
                      t('page.banlog.charts.options.thresold')
                    }}</a-typography-text>
                  </a-space>
                </a-form-item>
              </a-form>
            </template>
          </a-popover>
        </template>
      </a-card>
      <a-card hoverable :title="t('page.banlog.charts.title.line', { days: lastDays })">
        <template #extra>
          <a-popover>
            <a-link>{{ t('page.banlog.charts.options.more') }}</a-link>
            <template #content>
              <a-form :model="{ lastDays }" style="width: 25vh">
                <a-form-item
                  field="field"
                  :label="t('page.banlog.charts.options.days')"
                  label-col-flex="100px"
                >
                  <a-select v-model="lastDays">
                    <a-option v-for="v in [7, 14, 30]" :key="v" :value="v">{{ v }}</a-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </template>
          </a-popover>
        </template>
        <v-chart
          class="chart"
          :option="lineOptions"
          theme="ovilia-green"
          autoresize
          :init-options="{ renderer: 'svg' }"
        />
      </a-card>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, reactive, computed } from 'vue'
import { useRequest } from 'vue-request'
import { getBanlogs } from '@/service/banLogs'
import type { BanLog } from '@/api/model/banlogs'
import { SVGRenderer } from 'echarts/renderers'
import { useDarkStore } from '@/stores/dark'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
const { t, d } = useI18n()
use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  GridComponent,
  SVGRenderer
])
const darkStore = useDarkStore()

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]
const option = reactive({
  field: 'peerId' as StringKeys<BanLog>,
  enableThreshold: true
})
const loadingOptions = {
  text: 'Loading…',
  color: '#4ea397',
  maskColor: 'rgba(255, 255, 255, 0.4)'
}

const pieChartOption = computed(() => {
  const chartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      type: 'scroll',
      right: 10,
      top: 20,
      bottom: 20,
      data: [] as string[]
    },
    backgroundColor: darkStore.isDark ? 'rgba(0, 0, 0, 0.0)' : undefined,
    series: [
      {
        name: t('page.banlog.charts.options.field.' + option.field),
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [] as { name: string; value: number }[],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  if (data.value) {
    const countMap = new Map<string, number>()
    data.value.results.forEach((v) => {
      const key = v[option.field]
      if (countMap.has(key)) {
        countMap.set(key, countMap.get(key)! + 1)
      } else {
        countMap.set(key, 1)
      }
    })

    chartOption.series[0].data = Array.from(countMap, ([name, value]) => ({
      name,
      value
    }))
    if (option.enableThreshold) {
      const threshold = 0.01 // 只展示大于 1% 的数据
      chartOption.series[0].data = chartOption.series[0].data.filter(
        (v) => v.value / data.value!.results.length > threshold
      )
    }
    chartOption.legend.data = chartOption.series[0].data.map((v) => v.name)
  }
  return chartOption
})
const { loading, data } = useRequest(getBanlogs, {
  defaultParams: [
    {
      pageIndex: 1,
      pageSize: 100000
    }
  ]
})

const lastDays = ref(7)
const lineOptions = computed(() => {
  const defaultOption = {
    xAxis: {
      type: 'category',
      data: [] as string[]
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: [] as number[],
        type: 'line',
        smooth: true,
        name: t('page.banlog.charts.line.options.field')
      }
    ]
  }
  if (data.value) {
    const today = new Date()
    today.setHours(0, 0, 0)
    const countMap = new Map<number, number>()
    for (let i = lastDays.value; i >= 0; i--) {
      const days = dayjs()
        .add(-1 * i, 'day')
        .startOf('day')
      countMap.set(days.valueOf(), 0)
    }
    const oldestDate = dayjs()
      .add(-1 * lastDays.value, 'day')
      .startOf('day')

    const usedData = data.value.results
      .filter((it) => {
        const banTime = dayjs(it.banAt)
        return banTime.isAfter(oldestDate)
      })
      .sort((a, b) => a.banAt - b.banAt)
    usedData.forEach((it) => {
      const key = dayjs(it.banAt).startOf('day').valueOf()
      if (countMap.has(key)) {
        countMap.set(key, countMap.get(key)!! + 1)
      } else {
        countMap.set(key, 1)
      }
    })
    countMap.forEach((value, key) => {
      defaultOption.xAxis.data.push(d(key, 'short'))
      defaultOption.series[0].data.push(value)
    })
  }
  return defaultOption
})
</script>

<style scoped>
.chart {
  height: 60vh;
  width: 80vh;
}
</style>
