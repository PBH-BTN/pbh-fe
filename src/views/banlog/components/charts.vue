<template>
  <div style="display: flex; align-items: center; flex-flow: column">
    <a-spin v-if="loading" dot />
    <a-space v-else direction="vertical">
      <a-collapse :default-active-key="['1']" :bordered="false">
        <a-collapse-item :header="t('page.banlog.charts.options.more')">
          <a-form :model="option">
            <a-form-item
              field="field"
              :label="t('page.banlog.charts.options.field')"
              label-col-flex="100px"
            >
              <a-select v-model="option.field">
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

            <a-form-item field="enableThreshold" :label="t('page.banlog.charts.options.thresold')">
              <a-switch v-model="option.enableThreshold" />
            </a-form-item>
          </a-form>
        </a-collapse-item>
      </a-collapse>
      <a-card hoverable>
        <v-chart class="chart" :option="chartOption" />
      </a-card>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, reactive, computed } from 'vue'
import { useRequest } from 'vue-request'
import { getBanlogs } from '@/service/banLogs'
import type { BanLog } from '@/api/model/banlogs'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, useDark().value ? 'dark' : 'light')
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]
const option = reactive({
  field: 'peerId' as StringKeys<BanLog>,
  enableThreshold: true
})

const chartOption = computed(() => {
  const chartOption = {
    title: {
      text: t('page.banlog.charts.options.field.' + option.field),
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      data: [] as string[]
    },
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
</script>

<style scoped>
.chart {
  height: 50vh;
  width: 60vh;
}
</style>
