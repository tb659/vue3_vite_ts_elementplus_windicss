<script setup lang="ts">
import { PropType } from 'vue'
import { Descriptions } from '@/components/Descriptions'
import { ElTag } from 'element-plus'
import { WorkOrderData } from '@/api/adminWorkOrder/workProcess/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<WorkOrderData>>,
    default: () => null
  },
  detailSchema: {
    type: Array as PropType<DescriptionsSchema[]>,
    default: () => []
  }
})
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}">
    <template #workOrderStatus="{ row }: { row: WorkOrderData }">
      <ElTag
        :type="
          row.workOrderStatus === 'unprocessed'
            ? ''
            : row.workOrderStatus === 'processed'
            ? 'success'
            : 'warning'
        "
      >
        {{
          t(
            row.workOrderStatus === 'unprocessed'
              ? 'common.untreated'
              : row.workOrderStatus === 'processed'
              ? 'common.processed'
              : 'common.canNotDispose'
          )
        }}
      </ElTag>
    </template>

    <template #submitterId="{ row }: { row: WorkOrderData }">
      {{ row.submitter?.name }}
    </template>

    <template #assignerId="{ row }: { row: WorkOrderData }">
      {{ row.submitter?.name }}
    </template>

    <template #imgs="{ row }: { row: WorkOrderData }">
      <div class="flex">
        <img
          width="60"
          class="m-2px"
          v-for="item in row.imgList"
          :key="item.uid"
          :src="item.url"
          alt=""
        />
      </div>
    </template>
  </Descriptions>
</template>
