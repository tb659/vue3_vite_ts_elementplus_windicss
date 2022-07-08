<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElTag, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, ref, unref, reactive, onMounted } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getResourceListApi,
  postResourceApi,
  putResourceApi,
  deleteResourceApi,
  putResourceDisableApi,
  putResourceEnableApi
} from '@/api/systemManager/resource'
import { ResourceListData } from '@/api/systemManager/resource/types'
import { dateNumFormat } from '@/utils'

const { register, tableObject, methods } = useTable<ResourceListData>({
  getListApi: getResourceListApi,
  delListApi: deleteResourceApi,
  enableApi: putResourceEnableApi,
  disableApi: putResourceDisableApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

const { t } = useI18n()

const parentResourceList = ref([{ label: '顶级资源', value: 0 }])

const resourceTypeList = ref([{ label: t('systemManager.menu'), value: 1 }])

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: t('systemManager.resourceName'),
    search: { show: true },
    form: { colProps: { span: 24 } }
  },
  {
    field: 'href',
    label: t('systemManager.resourceHref'),
    form: { colProps: { span: 24 } }
  },
  {
    field: 'code',
    width: '100px',
    label: t('systemManager.resourceCode'),
    search: { show: true },
    form: { colProps: { span: 24 } }
  },
  {
    field: 'parentId',
    width: '100px',
    label: t('systemManager.parentResourceName'),
    form: {
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: parentResourceList.value
      },
      colProps: { span: 24 }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return parentResourceList.value.filter((data) => data.value === cellValue)[0]?.label
    }
  },
  {
    field: 'type',
    width: '100px',
    label: t('systemManager.resourceType'),
    form: {
      value: 1,
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: resourceTypeList.value
      },
      colProps: { span: 24 }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return resourceTypeList.value.filter((data) => data.value === cellValue)[0]?.label
    }
  },
  {
    field: 'note',
    label: t('systemManager.resourceNote'),
    form: {
      componentProps: { type: 'textarea' },
      colProps: { span: 24 }
    }
  },
  {
    field: 'status',
    width: '100px',
    label: t('systemManager.resourceStatus'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(ElTag, { type: cellValue === 1 ? '' : 'danger' }, () =>
        t(cellValue === 1 ? 'common.enable' : 'common.disable')
      )
    },
    search: {
      show: true,
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: [
          { label: t('common.enable'), value: 1 },
          { label: t('common.disable'), value: 0 }
        ]
      }
    },
    form: {
      value: 1,
      component: 'Radio',
      componentProps: {
        options: [
          { label: t('common.enable'), value: 1 },
          { label: t('common.disable'), value: 0 }
        ]
      },
      colProps: { span: 24 }
    }
  },
  {
    field: 'crtTime',
    width: '180px',
    label: t('common.createTime'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return dateNumFormat(cellValue)
    },
    form: { show: false }
  },
  {
    field: 'action',
    width: '160px',
    label: t('common.action'),
    form: { show: false }
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

const action = (row: ResourceListData, type: string) => {
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
      const data = (await write?.getFormData()) as ResourceListData
      // 权限控制到菜单
      data.permissions = 'Q'
      let api = putResourceApi
      if (!data.id) {
        data.domain = ''
        data.defaultAssign = 1
        api = postResourceApi
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
        !data.id && updateSchemas()
      }
    }
  })
}

const delData = async (row: ResourceListData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
    multiple
  )
}

const enableData = async (row: ResourceListData) => {
  const { enableItem } = methods
  await enableItem(row.id)
}

const disableData = async (row: ResourceListData) => {
  const { disableItem } = methods
  await disableItem(row.id)
}

const updateSchemas = () => {
  allSchemas.formSchema.filter((schema) => schema.field === 'parentId')[0].componentProps!.options =
    parentResourceList.value.concat(
      tableObject.tableList.map((data) => {
        return { label: data.name, value: data.id as unknown as number }
      })
    )
}

onMounted(async () => {
  tableObject.isTreeList = true
  await getList()
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
      row-key="id"
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      @register="register"
    >
      <template #action="{ row }">
        <ElLink
          v-show="row.status === 0"
          :disabled="row.root === 0"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="enableData(row)"
        >
          {{ t('common.enable') }}
        </ElLink>
        <ElLink
          v-show="row.status === 1"
          :disabled="row.root === 0"
          :underline="false"
          type="danger"
          class="ml-10px cursor-pointer"
          @click="disableData(row)"
        >
          {{ t('common.disable') }}
        </ElLink>
        <ElLink
          :disabled="row.root === 0"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.edit') }}
        </ElLink>
        <ElLink
          :disabled="row.root === 0"
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
      <ElButton type="primary" :loading="loading" @click="save">{{ t('common.save') }} </ElButton>
    </template>
  </Dialog>
</template>
