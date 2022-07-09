<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElTag, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getRoleListApi,
  postRoleApi,
  putRoleApi,
  deleteRoleApi,
  putRoleEnableApi,
  putRoleDisableApi
} from '@/api/adminSystemManager/role'
import { RoleData } from '@/api/adminSystemManager/role/types'
import { dateNumFormat } from '@/utils'

const { register, tableObject, methods } = useTable<RoleData>({
  getListApi: getRoleListApi,
  delListApi: deleteRoleApi,
  enableApi: putRoleEnableApi,
  disableApi: putRoleDisableApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

getList()

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: t('systemManager.roleName'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'code',
    label: t('systemManager.roleCode'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'note',
    label: t('systemManager.roleDecription'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'crtTime',
    label: t('common.createTime'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return dateNumFormat(cellValue)
    },
    form: { show: false }
  },
  {
    field: 'status',
    label: t('systemManager.roleStatus'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(ElTag, { type: cellValue === 1 ? '' : 'danger' }, () =>
        t(cellValue === 1 ? 'common.enable' : 'common.disable')
      )
    },
    search: {
      show: true,
      component: 'Select',
      componentProps: {
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
      }
    }
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

const action = (row: RoleData, type: string) => {
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
      const data = (await write?.getFormData()) as RoleData
      const keys = write?.treeRef?.getCheckedKeys().concat(write?.treeRef?.getHalfCheckedKeys())
      data.resourceList = keys?.map((key) => ({ id: key as number, permissions: 'Q' }))
      let api = putRoleApi
      if (!data.id) {
        api = postRoleApi
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

const delData = async (row: RoleData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
}

const enableData = async (row: RoleData) => {
  const { enableItem } = methods
  await enableItem(row.id)
}

const disableData = async (row: RoleData) => {
  const { disableItem } = methods
  await disableItem(row.id)
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
      <template #action="{ row }">
        <ElLink
          v-show="row.status === 0"
          :disabled="row.id === 4"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="enableData(row)"
        >
          {{ t('common.enable') }}
        </ElLink>
        <ElLink
          v-show="row.status === 1"
          :disabled="row.id === 4"
          :underline="false"
          type="danger"
          class="ml-10px cursor-pointer"
          @click="disableData(row)"
        >
          {{ t('common.disable') }}
        </ElLink>
        <ElLink
          :disabled="row.id === 4"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.edit') }}
        </ElLink>
        <ElLink
          :disabled="row.id === 4"
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

  <Dialog v-model="dialogVisible" :title="dialogTitle" maxHeight="auto">
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
