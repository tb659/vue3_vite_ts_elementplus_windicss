<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElLink, ElButton, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { ref, unref, reactive, onMounted } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getGoodInfoApi,
  postGoodInfoApi,
  putGoodInfoApi,
  deleteGoodInfoApi
} from '@/api/adminShopManager/goodInfo'
import { GoodInfoData } from '@/api/adminShopManager/goodInfo/types'
import { getShopInfoApi } from '@/api/adminShopManager/shopInfo'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'

const { register, tableObject, methods } = useTable<GoodInfoData>({
  getListApi: getGoodInfoApi,
  delListApi: deleteGoodInfoApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

setSearchParams({ productCategory: 'lease' })

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
    field: 'mchId',
    label: t('venueManager.venueName'),
    search: {
      show: true,
      component: 'Select',
      componentProps: {
        options: []
      }
    },
    form: {
      colProps: { span: 24 },
      component: 'Select',
      componentProps: {
        options: []
      }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: ShopInfoData) => {
      return cellValue.name
    }
  },
  {
    field: 'name',
    label: t('venueManager.leaseGood'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'introduction',
    label: t('venueManager.leaseDecription')
  },
  {
    field: 'leaseDeposit',
    label: t('venueManager.hasLeaseDeposit')
  },
  {
    field: 'leaseDepositMoney',
    label: t('venueManager.leaseDepositMoney')
  },
  {
    field: 'leaseUnit',
    label: t('venueManager.leaseUnit')
  },
  {
    field: 'leaseMaxCount',
    label: t('venueManager.leaseMaxCount')
  },
  {
    field: 'price',
    label: t('venueManager.price')
  },
  {
    field: 'buyingTips',
    label: t('venueManager.buyingTips')
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

const AddAction = () => {
  dialogTitle.value = t('common.add')
  actionType.value = ''
  tableObject.currentRow = null
  dialogVisible.value = true
}

const action = (row: GoodInfoData, type: string) => {
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
      const data = (await write?.getFormData()) as GoodInfoData
      data.productCategory = 'lease'
      let api = putGoodInfoApi
      if (!data.id) {
        api = postGoodInfoApi
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

const shopInfoListData = ref<ShopInfoData[]>([])
const updateSchemas = () => {
  const keys = ['searchSchema', 'formSchema']
  keys.forEach((key) => {
    allSchemas[key].filter((schema) => schema.field === 'mchId')[0].componentProps!.options =
      shopInfoListData.value.map((item) => {
        return { label: item.name, value: item.id }
      })
    if (key === 'searchSchema') {
      allSchemas[key].filter((schema) => schema.field === 'mchId')[0].value =
        shopInfoListData.value[0].id
    }
  })
}

onMounted(async () => {
  const res = await getShopInfoApi({ page: 1, size: 999 })
  if (res) {
    shopInfoListData.value = res.data.rows
  }
  updateSchemas()
})
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
      <template #action="{ row }">
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
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'lease')"
        >
          {{ t('common.lease') }}
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
