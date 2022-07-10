<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { ElLink, ElTag } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { getTouristInfoApi, deleteTouristInfoApi } from '@/api/adminTouristManager/touristInfo'
import { GoodOrderData } from '@/api/adminShopManager/goodOrder/types'
import { dateNumFormat } from '@/utils'

const { t } = useI18n()

const auditType = [
  { label: t('common.aduit'), value: 0 },
  { label: t('common.expired'), value: 1 },
  { label: t('common.toAudit'), value: 2 },
  { label: t('common.fail'), value: 3 }
]

const { register, tableObject, methods } = useTable<GoodOrderData>({
  getListApi: getTouristInfoApi,
  delListApi: deleteTouristInfoApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

getList()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('common.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'nickName',
    label: t('touristManager.touristNickName'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'name',
    label: t('touristManager.touristName'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'dateTime',
    label: t('touristManager.dateTime'),
    search: {
      show: true,
      component: 'DatePicker',
      componentProps: {
        type: 'daterange',
        startPlaceholder: t('touristManager.beginTime'),
        endPlaceholder: t('touristManager.endTime')
      }
    },
    form: {
      colProps: { span: 24 },
      component: 'DatePicker',
      componentProps: {
        type: 'daterange',
        startPlaceholder: t('touristManager.beginTime'),
        endPlaceholder: t('touristManager.endTime')
      }
    },
    table: { show: false }
  },
  {
    field: 'idType',
    label: t('touristManager.idType'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'idNo',
    label: t('touristManager.idNo'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'submitTime',
    label: t('touristManager.submitTime'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return dateNumFormat(cellValue)
    }
  },
  {
    field: 'status',
    label: t('touristManager.auditStatus'),
    search: {
      show: true,
      component: 'Select',
      componentProps: { options: auditType }
    },
    form: {
      colProps: { span: 24 },
      component: 'Select',
      componentProps: { options: auditType }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {},
        () => auditType.filter((audit) => audit.value === cellValue)[0]?.label || ''
      )
    }
  },
  {
    field: 'auditTime',
    label: t('touristManager.auditTime'),
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

const aduit = (row: GoodOrderData) => {
  console.log(row)
}
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

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
          @click="aduit(row)"
        >
          {{ t('common.aduit') }}
        </ElLink>
      </template>
    </Table>
  </ContentWrap>
</template>
