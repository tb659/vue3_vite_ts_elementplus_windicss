<script setup lang="ts">
import { PropType } from 'vue'
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag } from 'element-plus'
import { GoodOrderData } from '@/api/adminShopManager/goodOrder/types'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<GoodOrderData>>,
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
    <template #status="{ row }: { row: GoodOrderData }">
      <ElTag :type="row.status === 1 ? 'success' : row.status === 2 ? 'warning' : 'danger'">
        {{
          row.status === 1
            ? t('common.important')
            : row.status === 2
            ? t('common.good')
            : t('common.commonly')
        }}
      </ElTag>
    </template>

    <!-- <template #content="{ row }: { row: GoodOrderData }">
      <div v-html="row.content"></div>
    </template> -->
  </Descriptions>
</template>
