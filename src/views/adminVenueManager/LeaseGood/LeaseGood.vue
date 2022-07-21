<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElLink, ElButton, ElTag, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getLeaseGoodApi,
  postLeaseGoodApi,
  putLeaseGoodApi,
  deleteLeaseGoodApi,
  putLeaseGoodOnApi,
  putLeaseGoodOffApi
} from '@/api/adminVenueManager/leaseGood'
import { LeaseGoodData } from '@/api/adminVenueManager/leaseGood/types'
import { getShopInfoApi } from '@/api/adminShopManager/shopInfo'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
// import { getGoodCategoryApi } from '@/api/adminShopManager/goodCategory'
// import { GoodCategoryData } from '@/api/adminShopManager/goodCategory/types'
import { REQUEST_URL } from '@/config/axios/config'

const { register, tableObject, methods } = useTable<LeaseGoodData>({
  getListApi: getLeaseGoodApi,
  delListApi: deleteLeaseGoodApi,
  onShelfApi: putLeaseGoodOnApi,
  offShelfApi: putLeaseGoodOffApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

const shopInfoListData = ref<ShopInfoData[]>([])

// const goodCategoryData = ref<GoodCategoryData[]>([])

const getData = async () => {
  const ShopRes = await getShopInfoApi({ page: 1, size: 999, mchCategory: 'venue' })
  // const CateRes = await getGoodCategoryApi({ page: 1, size: 999 })
  if (ShopRes) {
    shopInfoListData.value = ShopRes.data.rows
  }
  // if (CateRes) {
  //   goodCategoryData.value = CateRes.data.rows
  // }
  updateSchemas()
}

getData()

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
    field: 'name',
    label: t('shopManager.goodName'),
    search: { show: true },
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'productImage',
    label: t('shopManager.goodImage'),
    form: {
      colProps: { span: 22 },
      component: 'Uploader'
    }
  },
  {
    field: 'mchId',
    label: t('venueManager.venueName'),
    search: {
      show: true,
      component: 'Select',
      componentProps: { options: [] }
    },
    form: {
      colProps: { span: 22 },
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: []
      }
    }
  },
  {
    field: 'introduction',
    label: t('venueManager.leaseDecription'),
    form: {
      colProps: { span: 22 },
      componentProps: {
        type: 'textarea',
        style: { width: '100%' }
      }
    }
  },
  {
    field: 'leaseDeposit',
    label: t('venueManager.hasLeaseDeposit'),
    form: {
      value: false,
      component: 'Switch',
      colProps: { span: 22 }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(ElTag, { type: cellValue ? '' : 'danger' }, () =>
        t(cellValue ? 'common.yes' : 'common.no')
      )
    }
  },
  {
    field: 'leaseDepositMoney',
    label: t('venueManager.leaseDepositMoney'),
    form: {
      component: 'InputNumber',
      colProps: { span: 22 }
    }
  },
  {
    field: 'leaseUnit',
    label: t('venueManager.leaseUnit'),
    form: {
      colProps: { span: 7 },
      componentProps: {
        style: { width: '100%' },
        placeholder: '小时/天'
      }
    }
  },
  {
    field: 'leaseMaxCount',
    label: t('venueManager.leaseMaxCount'),
    form: {
      component: 'InputNumber',
      colProps: { span: 7 }
    }
  },
  {
    field: 'price',
    label: t('venueManager.price'),
    form: {
      component: 'InputNumber',
      colProps: { span: 8 }
    }
  },
  {
    field: 'onShelf',
    label: t('shopManager.hasPutawaw'),
    form: {
      value: true,
      component: 'Switch',
      colProps: { span: 8 }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(ElTag, { type: cellValue ? '' : 'danger' }, () =>
        t(cellValue ? 'common.yes' : 'common.no')
      )
    }
  },
  {
    field: 'buyingTips',
    label: t('venueManager.buyingTips'),
    form: {
      colProps: { span: 22 },
      componentProps: {
        type: 'textarea',
        style: { width: '100%' }
      }
    }
  },
  {
    field: 'action',
    width: '220px',
    label: t('tableDemo.action'),
    form: { show: false },
    detail: { show: false }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const actionType = ref('')

const dialogVisible = ref(false)

const dialogTitle = ref('')

const AddAction = () => {
  dialogTitle.value = t('common.add')
  actionType.value = ''
  tableObject.currentRow = null
  dialogVisible.value = true
}

const action = (row: LeaseGoodData, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'common.edit' : 'common.lease')
  actionType.value = type
  tableObject.currentRow = row
  dialogVisible.value = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as LeaseGoodData
      data.productCategory = 'lease'
      let api = postLeaseGoodApi
      if (data.id) {
        api = putLeaseGoodApi
      }
      const res = await api(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        ElMessage.success(t('common.saveSuccess'))
        dialogVisible.value = false
        tableObject.currentPage = 1
        await getList()
      }
    }
  })
}

const delData = async (row: LeaseGoodData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
}

const onShelfData = async (row: LeaseGoodData) => {
  const { onShelfItem } = methods
  await onShelfItem(row.id)
}

const offShelfData = async (row: LeaseGoodData) => {
  const { offShelfItem } = methods
  await offShelfItem(row.id)
}

const updateSchemas = () => {
  const keys = ['searchSchema', 'formSchema']
  keys.forEach((key) => {
    allSchemas[key].filter((schema) => schema.field === 'mchId')[0].componentProps!.options =
      shopInfoListData.value.map((item) => {
        return { label: item.name, value: item.id }
      })
  })
}
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">
        <Icon icon="akar-icons:circle-plus" class="mr-5px" />
        {{ t('common.add') }}
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
      <template #productImage="{ row }">
        <img
          class="w-80px"
          :src="`${REQUEST_URL}${row.productImage}`"
          :alt="`${REQUEST_URL}${row.productImage}`"
        />
      </template>
      <template #mchId="{ row }">
        {{ row.mch.name }}
      </template>
      <template #productTypeId="{ row }">
        {{ row.productType.name }}
      </template>
      <template #action="{ row }">
        <ElLink
          v-show="!row.onShelf"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="onShelfData(row)"
        >
          {{ t('common.putaway') }}
        </ElLink>
        <ElLink
          v-show="row.onShelf"
          :underline="false"
          type="danger"
          class="ml-10px cursor-pointer"
          @click="offShelfData(row)"
        >
          {{ t('common.soldOut') }}
        </ElLink>
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.edit') }}
        </ElLink>
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="delData(row, false)"
        >
          {{ t('common.del') }}
        </ElLink>
        <!-- <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'lease')"
        >
          {{ t('common.lease') }}
        </ElLink> -->
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType === 'edit'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="tableObject.currentRow"
    />

    <template #footer>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
      <ElButton v-if="actionType === 'edit'" type="primary" :loading="loading" @click="save">
        {{ t('common.save') }}
      </ElButton>
    </template>
  </Dialog>
</template>
