<template>
  <a-row
    justify="center"
    align="stretch"
    :wrap="true"
    :gutter="[
      { xs: 12, sm: 12, md: 12, lg: 12, xl: 24 },
      { xs: 12, sm: 12, md: 12, lg: 12, xl: 24 }
    ]"
  >
    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
      <a-card hoverable :title="t('page.banlog.charts.options.field.' + pieOption.field)">
        <v-chart
          class="chart"
          :option="pieChartOption"
          :loading="pieLoading"
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
              <a-form :model="pieOption" style="width: 25vh">
                <a-form-item field="field" :label="t('page.banlog.charts.options.field')">
                  <a-select
                    v-model="pieOption.field"
                    :trigger-props="{ autoFitPopupMinWidth: true }"
                  >
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
                    <a-switch v-model="pieOption.enableThreshold" />
                    <a-typography-text>{{
                      t('page.banlog.charts.options.thresold')
                    }}</a-typography-text>
                  </a-space>
                </a-form-item>
                <a-form-item field="mergeSameVersion" v-if="pieOption.field === 'peerId'">
                  <a-space>
                    <a-switch v-model="pieOption.mergeSameVersion" />
                    <a-typography-text>{{
                      t('page.banlog.charts.options.mergeSame')
                    }}</a-typography-text>
                  </a-space>
                </a-form-item>
              </a-form>
            </template>
          </a-popover>
        </template>
      </a-card>
    </a-col>
    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
      <a-card hoverable :title="t('page.banlog.charts.title.line')">
        <template #extra>
          <a-popover>
            <a-link>{{ t('page.banlog.charts.options.more') }}</a-link>
            <template #content>
              <a-form :model="lineOption">
                <a-form-item
                  field="timeStep"
                  :label="t('page.banlog.charts.options.steps')"
                  label-col-flex="100px"
                >
                  <a-radio-group
                    v-model="lineOption.timeStep"
                    @change="(v: string | number | boolean) => changeStep(v as string)"
                  >
                    <a-radio value="day">{{ t('page.banlog.charts.options.day') }}</a-radio>
                    <a-radio value="hour">{{ t('page.banlog.charts.options.hour') }}</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item
                  field="range"
                  :label="t('page.banlog.charts.options.days')"
                  label-col-flex="100px"
                >
                  <a-range-picker
                    show-time
                    v-model="lineOption.range"
                    value-format="Date"
                    :shortcuts="
                      lineOption.timeStep === 'day'
                        ? [
                            {
                              label: t('page.banlog.charts.options.shortcut.7days'),
                              value: () => [
                                dayjs().startOf('day').add(-7, 'day').toDate(),
                                new Date()
                              ]
                            },
                            {
                              label: t('page.banlog.charts.options.shortcut.14days'),
                              value: () => [
                                dayjs().startOf('day').add(-14, 'day').toDate(),
                                new Date()
                              ]
                            },
                            {
                              label: t('page.banlog.charts.options.shortcut.30days'),
                              value: () => [
                                dayjs().startOf('day').add(-30, 'day').toDate(),
                                new Date()
                              ]
                            }
                          ]
                        : [
                            {
                              label: t('page.banlog.charts.options.shortcut.6hours'),
                              value: () => [
                                dayjs().startOf('hour').add(-6, 'hour').toDate(),
                                new Date()
                              ]
                            },
                            {
                              label: t('page.banlog.charts.options.shortcut.12hours'),
                              value: () => [
                                dayjs().startOf('hour').add(-12, 'hour').toDate(),
                                new Date()
                              ]
                            },
                            {
                              label: t('page.banlog.charts.options.shortcut.24hours'),
                              value: () => [
                                dayjs().startOf('hour').add(-24, 'hour').toDate(),
                                new Date()
                              ]
                            }
                          ]
                    "
                  />
                </a-form-item>
              </a-form>
            </template>
          </a-popover>
        </template>
        <v-chart
          class="chart"
          :option="lineChartOptions"
          :loading="lineLoading"
          :loadingOptions="loadingOptions"
          theme="ovilia-green"
          autoresize
          :init-options="{ renderer: 'svg' }"
        />
      </a-card>
    </a-col>
  </a-row>
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
import { ref, reactive, watch } from 'vue'
import { useRequest } from 'vue-request'
import { SVGRenderer } from 'echarts/renderers'
import { useDarkStore } from '@/stores/dark'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { getAnalysisDataByField, getTimebasedStaticsData } from '@/service/ruleStatics'
const { t } = useI18n()
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

const pieOption = reactive({
  field: 'peerId' as 'peerId' | 'torrentName' | 'module',
  enableThreshold: true,
  mergeSameVersion: false
})
const loadingOptions = {
  text: 'Loading…',
  color: '#4ea397',
  maskColor: 'rgba(255, 255, 255, 0.4)'
}

const pieChartOption = ref({
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
    data: [] as string[],
    textStyle: {
      overflow: 'truncate',
      width: 100
    },
    tooltip: {
      show: true
    }
  },
  backgroundColor: darkStore.isDark ? 'rgba(0, 0, 0, 0.0)' : undefined,
  series: [
    {
      name: t('page.banlog.charts.options.field.' + pieOption.field),
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
})

const changeStep = (v: string) => {
  if (v === 'day') {
    lineOption.range = [dayjs().startOf('day').add(-7, 'day').toDate(), new Date()]
  } else {
    lineOption.range = [dayjs().startOf('hour').add(-6, 'hour').toDate(), new Date()]
  }
}

watch(pieOption, (v) => {
  runPie(v.field, v.enableThreshold)
})

const { loading: pieLoading, run: runPie } = useRequest(getAnalysisDataByField, {
  defaultParams: ['peerId', true],
  onSuccess: (data) => {
    if (data) {
      const nonEmptyData = data.map((it) => {
        if (it.data === '') it.data = t('page.banlog.charts.options.field.empty')
        return it
      })
      if (pieOption.mergeSameVersion && pieOption.field === 'peerId') {
        const map = new Map<string, number>()
        nonEmptyData.forEach((it) => {
          let key = it.data
          const match = key.match(/^([-]?[a-zA-z]+)[0-9]+.*/)
          if (match && match?.length >= 2) key = match[1] + '*'
          if (map.has(key)) {
            map.set(key, map.get(key)!! + it.count)
          } else {
            map.set(key, it.count)
          }
        })
        pieChartOption.value.legend.data = []
        pieChartOption.value.series[0].data = []
        Array.from(map).forEach(([key, value]) => {
          pieChartOption.value.legend.data.push(key)
          pieChartOption.value.series[0].data.push({
            name: key,
            value
          })
        })
      } else {
        pieChartOption.value.legend.data = nonEmptyData.map((it) => it.data)
        pieChartOption.value.series[0].data = nonEmptyData.map((it) => ({
          name: it.data,
          value: it.count
        }))
      }
    }
  }
})

const lineOption = reactive({
  timeStep: 'day' as 'day' | 'hour',
  range: [dayjs().startOf('day').add(-7, 'day').toDate(), new Date()]
})

const lineChartOptions = ref({
  xAxis: {
    type: 'time'
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    trigger: 'axis'
  },
  series: [
    {
      data: [] as [Date, number][],
      type: 'line',
      smooth: true,
      name: t('page.banlog.charts.line.options.field')
    }
  ]
})

watch(lineOption, (v) => {
  runLine(v.range[0], v.range[1], v.timeStep)
})

const { loading: lineLoading, run: runLine } = useRequest(getTimebasedStaticsData, {
  defaultParams: [dayjs().startOf('day').add(-7, 'day').toDate(), new Date(), 'day'],
  onSuccess: (data) => {
    if (data) {
      const map = new Map<number, number>()
      for (
        let cur = dayjs(lineOption.range[0]);
        cur.isBefore(dayjs(lineOption.range[1]));
        cur = cur.add(1, lineOption.timeStep)
      ) {
        map.set(cur.valueOf(), 0)
      }
      data.forEach((it) => {
        map.set(dayjs(it.timestamp).startOf(lineOption.timeStep).valueOf(), it.count)
      })
      lineChartOptions.value.series[0].data = Array.from(map).map(([key, value]) => [
        new Date(key),
        value
      ])
    }
  }
})
</script>

<style scoped>
.chart {
  height: 50vh;
}
</style>
