<script setup lang="ts">
import { PropType } from 'vue'
import { Descriptions } from '@/components/Descriptions'
import { ElTag } from 'element-plus'
import { TicketsOrderData } from '@/api/adminTouristManager/ticketsOrder/types'
import { useI18n } from 'vue-i18n'
import { moneyFormat } from '@/utils'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TicketsOrderData>>,
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
    <template #ticketStatus="{ row }: { row: TicketsOrderData }">
      <ElTag
        :type="
          row.ticketStatus === 'payed'
            ? 'success'
            : row.ticketStatus === 'used'
            ? 'warning'
            : 'danger'
        "
      >
        {{
          t(
            row.ticketStatus === 'payed'
              ? 'common.payed'
              : row.ticketStatus === 'used'
              ? 'common.used'
              : row.ticketStatus === 'expired'
              ? 'common.expired'
              : 'common.invalid'
          )
        }}
      </ElTag>
    </template>

    <template #price="{ row }: { row: TicketsOrderData }">
      {{ moneyFormat(row.price) }}
    </template>
  </Descriptions>
</template>
