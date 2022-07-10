<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { reactive, ref } from 'vue'
import Detail from './components/Detail.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { getTouristInfoApi, deleteTouristInfoApi } from '@/api/adminTouristManager/touristInfo'
import { GoodOrderData } from '@/api/adminShopManager/goodOrder/types'
import { dateNumFormat } from '@/utils'

const { register, tableObject, methods } = useTable<GoodOrderData>({
  getListApi: getTouristInfoApi,
  delListApi: deleteTouristInfoApi,
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
    field: 'orderCode',
    label: t('shopManager.orderCode'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'mch',
    label: t('shopManager.shopName'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'status',
    label: t('shopManager.orderStatus'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'orderPrice',
    label: t('shopManager.orderPrice'),
    form: { show: false }
  },
  {
    field: 'crtTime',
    label: t('common.createTime'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return dateNumFormat(cellValue)
    }
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
  if (type === 'print') return print(row)
  dialogTitle.value = t('common.detail')
  actionType.value = type
  tableObject.currentRow = row
  dialogVisible.value = true
}

const print = (row: GoodOrderData) => {
  console.log(row)
}

const exportData = () => {
  ElMessage.success('exportData')
}
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

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
