<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElTag, /* ElMessage, */ ElLink } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, reactive, ref, unref, nextTick } from 'vue'
import Detail from './components/Detail.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { getGoodOrderyApi, getGoodDetailApi } from '@/api/adminShopManager/goodOrder'
import { GoodOrderData, GoodsDetailData } from '@/api/adminShopManager/goodOrder/types'
import { getShopInfoApi } from '@/api/adminShopManager/shopInfo'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { dateNumFormat, moneyFormat, exportFile } from '@/utils'
import { orderStatus } from '@/utils/common'
import { printObj } from '@/config/app'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const { register, tableObject, methods } = useTable<GoodOrderData>({
  getListApi: getGoodOrderyApi,
  response: { rows: 'rows', total: 'total' }
})

const { setSearchParams } = methods

const shopInfoListData = ref<ShopInfoData[]>([])

const getData = async () => {
  const ShopRes = await getShopInfoApi({ page: 1, size: 999, mchCategory: 'shop' })
  if (ShopRes) {
    shopInfoListData.value = ShopRes.data.rows
  }
  updateSchemas()
}

getData()

setSearchParams({ orderCategory: 'goods' })

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('common.index'),
    type: 'index',
    form: { show: false },
    detail: { show: false }
  },
  {
    field: 'orderNumber',
    label: t('shopManager.orderCode'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'mchId',
    label: t('shopManager.shopName'),
    search: {
      show: true,
      component: 'Select',
      componentProps: { options: [] }
    },
    form: { show: false },
    table: { show: false }
  },
  {
    field: 'mchName',
    label: t('shopManager.shopName'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'orderStatus',
    label: t('shopManager.orderStatus'),
    form: {
      colProps: { span: 22 }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type:
            cellValue === 1 ? 'warning' : cellValue === 2 ? '' : cellValue === 3 ? 'success' : ''
        },
        () => orderStatus.filter((item) => item.value === cellValue)[0]?.label
      )
    }
  },
  {
    field: 'amount',
    label: t('shopManager.orderPrice'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return moneyFormat(cellValue)
    }
  },
  {
    field: 'crtTime',
    width: '180px',
    label: t('common.createTime'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return dateNumFormat(cellValue)
    },
    detail: { show: false }
  },
  {
    field: 'action',
    width: '160px',
    label: t('tableDemo.action'),
    form: { show: false },
    detail: { show: false }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const actionType = ref('')

const dialogVisible = ref(false)

const dialogTitle = ref('')

const action = (row: GoodOrderData, type: string) => {
  // if (type === 'print') return print(row)
  dialogTitle.value = t('common.detail')
  actionType.value = type
  tableObject.currentRow = row
  dialogVisible.value = true
}

const updateSchemas = () => {
  const keys = ['searchSchema']
  keys.forEach((key) => {
    allSchemas[key].filter((schema) => schema.field === 'mchId')[0].componentProps!.options =
      shopInfoListData.value.map((item) => {
        return { label: item.name, value: item.id }
      })
  })
}
const searchRef = ref<ComponentRef<typeof Search>>()

const exportData = async () => {
  let params = { page: tableObject.currentPage, size: tableObject.pageSize, orderCategory: 'goods' }
  const search = unref(searchRef)
  params = Object.assign(params, await search!.getFormData())
  exportFile(params)
}

const printRef = ref()

let printData = reactive({
  total: '0',
  order: {} as GoodOrderData,
  items: [] as GoodsDetailData[]
})

const { loadStart, loadDone } = usePageLoading()

const print = async (id) => {
  loadStart()
  const res = await getGoodDetailApi(id)
  loadDone()
  if (res) {
    printData.total = '0'
    printData.order = res.data.order
    printData.items = res.data.items
    let sum = 0
    printData.items.forEach((item) => {
      item['price'] = moneyFormat(item.productPrice)
      item['totalPrice'] = moneyFormat(item.productCount * item.productPrice)
      sum += item.productCount * item.productPrice
    })
    printData.total = moneyFormat(sum)
    await nextTick()
    console.log(printData)
    printRef.value.click()
  }
}
</script>

<template>
  <ContentWrap>
    <Search
      ref="searchRef"
      :schema="allSchemas.searchSchema"
      @search="setSearchParams"
      @reset="setSearchParams"
    />

    <div class="mb-10px">
      <ElButton type="primary" @click="exportData">
        <Icon icon="carbon:document-export" class="mr-5px" />
        {{ t('common.export') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'detail')"
        >
          {{ t('shopManager.goodDetail') }}
        </ElLink>
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="print(row.id)"
        >
          {{ t('common.print') }}
        </ElLink>
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Detail :detail-schema="allSchemas.detailSchema" :current-row="tableObject.currentRow" />
  </Dialog>

  <div class="absolute -z-1">
    <div v-print="printObj" ref="printRef">打印</div>
    <div id="printMe" class="bg-white w-300px h-full p-20px">
      <header class="leading-loose">
        <h1 class="text-center text-2xl mb-10px">订单小票</h1>
        <p>
          <span>订单编号：</span>
          <span>{{ printData.order.id }}</span>
        </p>
        <p>
          <span>下单时间：</span>
          <span>{{ printData.order.crtTime }}</span>
        </p>
      </header>
      <div class="w-full whitespace-nowrap overflow-hidden my-10px">
        --------------------------------------
      </div>
      <div>
        <div class="flex mb-10px">
          <span class="flex-1">名称</span>
          <span class="w-60px text-right">单价</span>
          <span class="w-40px text-right">数量</span>
          <span class="w-80px text-right">小计</span>
        </div>
        <div class="w-full whitespace-nowrap overflow-hidden my-10px">
          --------------------------------------
        </div>
        <div class="flex leading-loose" v-for="item in printData.items" :key="item.id">
          <span class="flex-1 truncate">{{ item.productName }}</span>
          <span class="w-60px text-right">{{ item['price'] }}</span>
          <span class="w-40px text-right">{{ item.productCount }}</span>
          <span class="w-80px text-right">{{ item['totalPrice'] }}</span>
        </div>
      </div>
      <div class="w-full whitespace-nowrap overflow-hidden my-10px">
        --------------------------------------
      </div>
      <!-- 总计 -->
      <div class="text-right">
        <span>总计：</span>
        <span>{{ printData['total'] }}</span>
      </div>
      <div class="w-full whitespace-nowrap overflow-hidden my-10px">
        --------------------------------------
      </div>
      <div class="text-2xl">
        {{ printData.order.mchName }}
      </div>
    </div>
  </div>
</template>
