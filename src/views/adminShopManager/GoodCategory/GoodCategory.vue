<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getGoodCategoryApi,
  postGoodCategoryApi,
  putGoodCategoryApi,
  deleteGoodCategoryApi
} from '@/api/adminShopManager/goodCategory'
import { GoodCategoryData } from '@/api/adminShopManager/goodCategory/types'
import { getShopInfoApi } from '@/api/adminShopManager/shopInfo'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { requestUrl } from '@/config/axios/config'
import { dateNumFormat } from '@/utils'

const { register, tableObject, methods } = useTable<GoodCategoryData>({
  getListApi: getGoodCategoryApi,
  delListApi: deleteGoodCategoryApi,
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
    form: { show: false }
  },
  {
    field: 'name',
    label: t('shopManager.categoryName'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    },
    detail: { span: 24 }
  },
  {
    field: 'imgPath',
    label: t('shopManager.categoryImage'),
    form: {
      colProps: { span: 24 },
      component: 'Uploader',
      componentProps: {
        accessLevel: 'PUBLIC'
      }
    }
  },
  {
    field: 'codeNumber',
    label: t('shopManager.codeNumber'),
    form: { colProps: { span: 24 } }
  },
  {
    field: 'mchId',
    label: t('shopManager.shopName'),
    form: {
      colProps: { span: 24 },
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: []
      }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: ShopInfoData) => {
      return cellValue.name
    }
  },
  {
    field: 'description',
    label: t('shopManager.ceategoryDescription'),
    form: {
      colProps: { span: 24 },
      component: 'Editor',
      componentProps: { style: { width: '100%' } }
    }
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
    form: { show: false }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const actionType = ref('')

const dialogVisible = ref(false)

const dialogTitle = ref('')

const AddAction = async () => {
  await updateSchemas()
  dialogTitle.value = t('common.add')
  actionType.value = ''
  tableObject.currentRow = null
  dialogVisible.value = true
}

const action = async (row: GoodCategoryData, type: string) => {
  await updateSchemas()
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
      const data = (await write?.getFormData()) as GoodCategoryData
      let api = putGoodCategoryApi
      if (!data.id) {
        api = postGoodCategoryApi
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

const delData = async (row: GoodCategoryData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
}

const shopInfoListData = ref<ShopInfoData[]>([])

const updateSchemas = async () => {
  const res = await getShopInfoApi({ page: 1, size: 999 })
  if (res) {
    shopInfoListData.value = res.data.rows
  }
  const keys = ['formSchema']
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
      <template #imgPath="{ row }">
        <img
          class="w-80px"
          :src="`${requestUrl}${row.imgPath}`"
          :alt="`${requestUrl}${row.imgPath}`"
        />
      </template>
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
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
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
