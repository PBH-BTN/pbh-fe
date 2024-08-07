<template>
  <a-space direction="vertical" fill>
    <a-typography-text style="font-size: 1.2em">
      {{
        t('page.rule_management.generic.description', {
          type: t('page.rule_management.' + type)
        })
      }}
    </a-typography-text>
    <a-space class="align-right" fill>
      <a-button type="primary" @click="handleAddOne">
        <template #icon>
          <icon-plus-circle />
        </template>
        {{ $t('page.rule_management.generic.addOne') }}
      </a-button>
    </a-space>
    <a-table :columns="columns" :data="dataSource" :loading="loading">
      <template #data="{ record, rowIndex }">
        <a-space v-if="!record.editing" style="display: flex;justify-content: space-between;" fill>
          <a-typography-text>{{ record.data }}</a-typography-text>
          <a-space>
            <a-button class="edit-btn" shape="circle" type="text" @click="record.editing = !record.editing">
              <template #icon>
                <icon-edit />
              </template>
            </a-button>
            <a-button class="edit-btn" shape="circle" status="danger" type="text" @click="record.editing = false">
              <template #icon>
                <icon-delete />
              </template>
            </a-button>
          </a-space>
        </a-space>
        <a-space v-else style="display: flex;justify-content: space-between;" fill>
          <a-input style="max-width: 100px;" v-model="record.data" />
          <a-space>
            <AsyncMethod once :async-fn="() => handleSubmit(rowIndex)" v-slot="{ run, loading }">
              <a-button class="edit-btn" shape="circle" type="text" status="success" @click="run">
                <template #icon>
                  <icon-refresh v-if="loading" :spin="loading" />
                  <icon-check v-else />
                </template>
              </a-button>
              <a-button class="edit-btn" shape="circle" status="danger" type="text" :disabled="loading"
                @click="record.isNew ? dataSource.splice(rowIndex, 1) : (record.data = record.oldData, record.editing = false)">
                <template #icon>
                  <icon-close />
                </template>
              </a-button>
            </AsyncMethod>
          </a-space>
        </a-space>
      </template>
    </a-table>
  </a-space>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { type ruleType } from '@/api/model/blacklist'
import { useRequest } from 'vue-request';
import { getBlackList } from '@/service/blacklist';
import AsyncMethod from '@/components/asyncMethod.vue'
import { reactive, type Reactive } from 'vue';
const { t } = useI18n()
const { type } = defineProps<{
  type: ruleType
}>()
type dataSourceItem<T extends ruleType> = {
  data: T extends 'port' | 'asn' ? number : string;
  oldData: T extends 'port' | 'asn' ? number : string;
  editing: boolean;
  isNew: boolean;
}
const dataSource = reactive([
  {
    data: "1.2.3.4",
    oldData: "1.2.3.4",
    editing: false,
    isNew: false
  },
  {
    data: "1.2.3.4",
    oldData: "1.2.3.4",
    editing: false,
    isNew: false
  },
  {
    data: "1.2.3.4",
    oldData: "1.2.3.4",
    editing: false,
    isNew: false
  },
]) as Reactive<dataSourceItem<typeof type>[]>
const columns = [
  {
    title: () => t('page.rule_management.' + type),
    slotName: 'data',
  }
]
const { loading } = useRequest(getBlackList, {
  defaultParams: [type],
  onSuccess: (data) => {
    dataSource.push(...data.data[type].map((item) => ({
      data: item,
      oldData: item,
      editing: false,
      isNew: false
    })))
  }
})
const handleAddOne = () => {
  dataSource.unshift({
    data: '',
    oldData: '',
    editing: true,
    isNew: true
  })
}
const handleSubmit = async (index: number) => {
  dataSource[index].editing = false
  dataSource[index].isNew = false
}
</script>
<style scoped>
.edit-btn {
  color: rgb(var(--gray-8));
  font-size: 16px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
