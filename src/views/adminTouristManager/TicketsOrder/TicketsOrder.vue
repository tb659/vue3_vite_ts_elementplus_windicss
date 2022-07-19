<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { /* ElButton, */ ElLink, /* ElMessage, */ ElTag } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, reactive, ref } from 'vue'
import Detail from './components/Detail.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { getTicketsOrderApi } from '@/api/adminTouristManager/ticketsOrder'
import { TicketsOrderData } from '@/api/adminTouristManager/ticketsOrder/types'
import { ticketStatus } from '@/utils/common'
import { moneyFormat } from '@/utils'

const { register, tableObject, methods } = useTable<TicketsOrderData>({
  getListApi: getTicketsOrderApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

getList()

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
    field: 'ticketName',
    label: t('touristManager.ticketName'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'mchName',
    label: t('shopManager.shopName'),
    search: { show: true },
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'ticketType',
    label: t('touristManager.ticketType'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'price',
    label: t('shopManager.orderPrice'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return moneyFormat(cellValue)
    }
  },
  {
    field: 'touristName',
    width: '120px',
    label: t('touristManager.touristName'),
    form: { show: false }
  },
  {
    field: 'idType',
    width: '120px',
    label: t('touristManager.idType'),
    form: { show: false }
  },
  {
    field: 'idNo',
    width: '180px',
    label: t('touristManager.idNo'),
    form: { show: false },
    detail: { width: 60 }
  },
  // {
  //   field: 'handset',
  //   label: t('touristManager.phoneNumber'),
  //   form: { show: false }
  // },
  {
    field: 'visitDate',
    width: '120px',
    label: t('touristManager.VisitedDate'),
    form: { show: false }
  },
  {
    field: 'purchaseDate',
    width: '160px',
    label: t('touristManager.BuiedDate'),
    form: { show: false }
  },
  {
    field: 'ticketStatus',
    width: '120px',
    label: t('touristManager.ticketStatus'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      return h(
        ElTag,
        {
          type: cellValue === 'used' ? 'warning' : cellValue === 'payed' ? 'success' : 'danger'
        },
        () => ticketStatus.filter((item) => item.value === cellValue)[0]?.label
      )
    }
    // },
    // {
    //   field: 'action',
    //   width: '160px',
    //   label: t('tableDemo.action'),
    //   form: { show: false },
    //   detail: { show: false }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const actionType = ref('')

const dialogVisible = ref(false)

const dialogTitle = ref('')

const action = (row: TicketsOrderData, type: string) => {
  if (type === 'print') return print(row)
  dialogTitle.value = t('common.detail')
  actionType.value = type
  tableObject.currentRow = row
  dialogVisible.value = true
}

const print = (row: TicketsOrderData) => {
  console.log(row)
}

// const exportData = () => {
//   ElMessage.success('exportData')
// }
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <!-- <div class="mb-10px">
      <ElButton type="primary" @click="exportData">
        <Icon icon="carbon:document-export" class="mr-5px" />
        {{ t('common.export') }}
      </ElButton>
    </div> -->

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
          @click="action(row, 'print')"
        >
          {{ t('common.print') }}
        </ElLink>
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Detail :detail-schema="allSchemas.detailSchema" :current-row="tableObject.currentRow" />
  </Dialog>
</template>
