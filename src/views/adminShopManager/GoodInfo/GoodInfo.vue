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
  getGoodInfoApi,
  postGoodInfoApi,
  putGoodInfoApi,
  deleteGoodInfoApi,
  putGoodInfoOnApi,
  putGoodInfoOffApi
} from '@/api/adminShopManager/goodInfo'
import { GoodInfoData } from '@/api/adminShopManager/goodInfo/types'
import { getShopInfoApi } from '@/api/adminShopManager/shopInfo'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { getGoodCategoryApi } from '@/api/adminShopManager/goodCategory'
import { GoodCategoryData } from '@/api/adminShopManager/goodCategory/types'
import { requestUrl } from '@/config/axios/config'

const { register, tableObject, methods } = useTable<GoodInfoData>({
  getListApi: getGoodInfoApi,
  delListApi: deleteGoodInfoApi,
  onShelfApi: putGoodInfoOnApi,
  offShelfApi: putGoodInfoOffApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

const shopInfoListData = ref<ShopInfoData[]>([])

const goodCategoryData = ref<GoodCategoryData[]>([])

const getData = async () => {
  const ShopRes = await getShopInfoApi({ page: 1, size: 999, mchCategory: 'shop' })
  const CateRes = await getGoodCategoryApi({ page: 1, size: 999 })
  if (ShopRes) {
    shopInfoListData.value = ShopRes.data.rows
  }
  if (CateRes) {
    goodCategoryData.value = CateRes.data.rows
  }
  updateSchemas()
}

getData()

setSearchParams({ productCategory: 'goods' })

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
    label: t('shopManager.shopName'),
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
    field: 'productTypeId',
    label: t('shopManager.goodCategory'),
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
    field: 'manufacturer',
    label: t('shopManager.manufacturer'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'packingUnit',
    label: t('shopManager.packingUnit'),
    form: {
      colProps: { span: 11 }
    }
  },
  {
    field: 'price',
    label: t('shopManager.standardPrice'),
    form: {
      component: 'InputNumber',
      colProps: { span: 11 }
    }
  },
  {
    field: 'inventoryNumber',
    label: t('shopManager.inventory'),
    form: {
      component: 'InputNumber',
      colProps: { span: 11 }
    }
  },
  {
    field: 'onShelf',
    label: t('shopManager.hasPutawaw'),
    form: {
      value: true,
      component: 'Switch',
      colProps: { span: 11 }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(ElTag, { type: cellValue ? '' : 'danger' }, () =>
        t(cellValue ? 'common.yes' : 'common.no')
      )
    }
  },
  {
    field: 'onShelfTime',
    width: '160px',
    label: t('shopManager.putawawyTime'),
    form: { show: false }
  },
  {
    field: 'action',
    width: '200px',
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

const action = (row: GoodInfoData, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'common.edit' : 'common.detail')
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
      const data = (await write?.getFormData()) as GoodInfoData
      data.productCategory = 'goods'
      let api = postGoodInfoApi
      if (data.id) {
        api = putGoodInfoApi
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

const delData = async (row: GoodInfoData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
}

const onShelfData = async (row: GoodInfoData) => {
  const { onShelfItem } = methods
  await onShelfItem(row.id)
}

const offShelfData = async (row: GoodInfoData) => {
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
    if (key === 'formSchema') {
      allSchemas[key].filter(
        (schema) => schema.field === 'productTypeId'
      )[0].componentProps!.options = goodCategoryData.value.map((item) => {
        return { label: item.name, value: item.id }
      })
    }
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
          :src="`${requestUrl}${row.productImage}`"
          :alt="`${requestUrl}${row.productImage}`"
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
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="tableObject.currentRow"
    />

    <template #footer>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
      <ElButton v-if="actionType !== 'detail'" type="primary" :loading="loading" @click="save">
        {{ t('common.save') }}
      </ElButton>
    </template>
  </Dialog>
</template>
