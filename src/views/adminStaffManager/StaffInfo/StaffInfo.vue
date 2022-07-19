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
  getStaffInfoApi,
  postStaffInfoApi,
  putStaffInfoApi,
  deleteStaffInfoApi
} from '@/api/adminStaffManager/staffInfo'
import { StaffInfoData } from '@/api/adminStaffManager/staffInfo/types'
import { getEpartmentApi } from '@/api/adminStaffManager/epartment'
import { EpartmentData } from '@/api/adminStaffManager/epartment/types'
import { getShopInfoApi } from '@/api/adminShopManager/shopInfo'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { dateNumFormat } from '@/utils'

const { register, tableObject, methods } = useTable<StaffInfoData>({
  getListApi: getStaffInfoApi,
  delListApi: deleteStaffInfoApi,
  response: { rows: 'rows', total: 'total' }
})
const { getList, setSearchParams } = methods

const shopInfoListData = ref<ShopInfoData[]>([])

const epartmentListData = ref<EpartmentData[]>([])

const getData = async () => {
  await getList()
  updateSchemas()
}
getData()

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
    label: t('staffManager.name'),
    search: { show: true },
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'workNo',
    label: t('staffManager.workNo'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'empNo',
    label: t('staffManager.code'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'dutyGroupId',
    label: t('staffManager.epartmentName'),
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
    field: 'merchantId',
    label: t('staffManager.shopOrVenue'),
    form: {
      colProps: { span: 22 },
      value: [],
      component: 'Select',
      componentProps: {
        multiple: true,
        style: { width: '100%' },
        options: []
      }
    }
  },
  {
    field: 'handset',
    label: t('staffManager.phoneNumber'),
    form: {
      colProps: { span: 22 }
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

const action = async (row: StaffInfoData, type: string) => {
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
      let data = (await write?.getFormData()) as StaffInfoData
      let params = {} as StaffInfoData
      let api = postStaffInfoApi
      if (data.id) {
        const keys = ['dataVersion', 'dutyGroupId', 'empNo', 'handset', 'id', 'name', 'workNo']
        keys.forEach((key) => {
          params[key] = data[key]
        })
        params.merchantIds = data.merchantId.join(',')
        data = params
        api = putStaffInfoApi
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

const delData = async (row: StaffInfoData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
}

const setMchName = (row: StaffInfoData) => {
  let name = ''
  if (row.merchantIds) {
    const ids = row.merchantIds.split(',')
    name = shopInfoListData.value
      .filter((shop) => ids.filter((id) => shop.id === +id).length)
      .map((shop) => shop.name)
      .join(',')
  }
  return name
}

const updateSchemas = async () => {
  if (!epartmentListData.value.length) {
    const res = await getEpartmentApi({ page: 1, size: 999 })
    if (res) {
      epartmentListData.value = res.data.rows
    }
  }
  const keys = ['formSchema']
  keys.forEach((key) => {
    allSchemas[key].filter((schema) => schema.field === 'dutyGroupId')[0].componentProps!.options =
      epartmentListData.value.map((item) => {
        return { label: item.name, value: item.id }
      })
  })
  if (!shopInfoListData.value.length) {
    const res = await getShopInfoApi({ page: 1, size: 999 })
    if (res) {
      shopInfoListData.value = res.data.rows
    }
  }
  keys.forEach((key) => {
    allSchemas[key].filter((schema) => schema.field === 'merchantId')[0].componentProps!.options =
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
      <template #dutyGroupId="{ row }">
        {{ row.dutyGroup.name }}
      </template>
      <template #merchantId="{ row }">
        {{ setMchName(row) }}
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
