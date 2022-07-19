<script setup lang="ts">
import { ElTable, ElTableColumn, ElSkeleton } from 'element-plus'
import { PropType, reactive, ref } from 'vue'
import { Descriptions } from '@/components/Descriptions'
import { ElTag } from 'element-plus'
import { orderStatus } from '@/utils/common'
import { moneyFormat } from '@/utils'
import { useI18n } from '@/hooks/web/useI18n'
import { getGoodDetailApi } from '@/api/adminShopManager/goodOrder'
import { GoodOrderData, GoodsDetailData } from '@/api/adminShopManager/goodOrder/types'

const { t } = useI18n()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<GoodOrderData>>,
    default: () => null
  }
})

const loading = ref(true)

const data = ref<GoodOrderData>({
  id: 0,
  amount: 0,
  crtTime: 0,
  dataState: 0,
  dataVersion: 0,
  mchId: 0,
  mchName: '',
  orderNumber: '',
  orderStatus: 1,
  touristId: 0,
  wxOpenId: ''
})

const tableList = ref<GoodsDetailData[]>([])

const getData = async () => {
  const res = await getGoodDetailApi(props.currentRow!.id)
  if (res) {
    loading.value = false
    data.value = res.data.order
    res.data.items.forEach((item) => {
      item.amount = moneyFormat(item.amount)
      item.productPrice = moneyFormat(item.productPrice)
    })
    tableList.value = res.data.items
  }
}
getData()

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'orderNumber',
    label: t('shopManager.orderCode')
  },
  {
    field: 'mchName',
    label: t('shopManager.shopName')
  },
  {
    field: 'orderStatus',
    label: t('shopManager.orderStatus')
  },
  {
    field: 'amount',
    label: t('shopManager.orderPrice')
  },
  {
    field: 'crtTime',
    label: t('common.createTime')
  }
])

const tableColumns = reactive([
  {
    field: 'productName',
    label: t('shopManager.goodName')
  },
  {
    field: 'productCount',
    label: t('shopManager.goodCount')
  },
  {
    field: 'productPrice',
    label: t('shopManager.standardPrice')
  },
  {
    field: 'amount',
    label: t('shopManager.amount')
  }
])
</script>

<template>
  <ElSkeleton v-if="loading" :rows="5" animated />
  <div v-else>
    <Descriptions :title="t('common.orderInfo')" :schema="schema" :data="data || {}">
      <template #orderStatus="{ row }: { row: GoodOrderData }">
        <ElTag
          :type="
            row.orderStatus === 1
              ? 'warning'
              : row.orderStatus === 2
              ? ''
              : row.orderStatus === 3
              ? 'success'
              : ''
          "
        >
          {{ orderStatus.filter((item) => item.value === row.orderStatus)[0]?.label }}
        </ElTag>
      </template>

      <template #amount="{ row }: { row: GoodOrderData }">
        {{ moneyFormat(row.amount) }}
      </template>
    </Descriptions>

    <Descriptions :title="t('common.goodsInfo')" is-custom>
      <template #custom>
        <ElTable :data="tableList">
          <ElTableColumn
            v-for="column in tableColumns"
            :key="column.field"
            :prop="column.field"
            :label="column.label"
          />
        </ElTable>
      </template>
    </Descriptions>
  </div>
</template>
