<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElTag } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { h, ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { getTableListApi, delTableListApi, saveTableApi } from '@/api/systemManager/user'
import { dateNumFormat } from '@/utils'

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
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
    field: 'username',
    label: t('systemManager.accountName'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    table: { show: false },
    form: {
      component: 'InputPassword',
      componentProps: {
        style: { width: '100%' }
      },
      colProps: { span: 24 }
    }
  },
  {
    field: 'roleList',
    label: t('common.roleType'),
    table: { show: false },
    form: {
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: [
          {
            label: t('common.superAdmin'),
            value: 0
          },
          {
            label: t('common.staff'),
            value: 1
          }
        ]
      },
      colProps: { span: 24 }
    }
  },
  {
    field: 'root',
    label: t('systemManager.accountType'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 0 ? 'success' : ''
        },
        () => t(cellValue === 0 ? 'common.superAdmin' : 'common.staff')
      )
    },
    form: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: t('common.superAdmin'),
            value: 0
          },
          {
            label: t('common.staff'),
            value: 1
          }
        ]
      },
      show: false
    }
  },
  {
    field: 'status',
    label: t('systemManager.accountStatus'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(ElTag, {}, () => t(cellValue === 1 ? 'common.enable' : 'common.disable'))
    },
    search: {
      show: true,
      component: 'Select',
      componentProps: {
        options: [
          {
            label: t('common.enable'),
            value: 1
          },
          {
            label: t('common.disable'),
            value: 0
          }
        ]
      }
    },
    form: {
      component: 'Radio',
      componentProps: {
        options: [
          {
            label: t('common.enable'),
            value: 1
          },
          {
            label: t('common.disable'),
            value: 0
          }
        ]
      },
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
    field: 'action',
    width: '220px',
    label: t('common.action'),
    form: {
      show: false
    }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)

const dialogTitle = ref('')

const AddAction = () => {
  dialogTitle.value = t('common.add')
  actionType.value = ''
  tableObject.currentRow = null
  dialogVisible.value = true
}

const delLoading = ref(false)

const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

const actionType = ref('')

const action = (row: TableData, type: string) => {
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
      const data = (await write?.getFormData()) as TableData
      const res = await saveTableApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        dialogVisible.value = false
        tableObject.currentPage = 1
        getList()
      }
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
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        <Icon icon="ep:delete" class="mr-5px" />
        {{ t('common.del') }}
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
          :disabled="row.root === 0"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.enable') }}
        </ElLink>
        <ElLink
          v-show="row.status === 1"
          :disabled="row.root === 0"
          :underline="false"
          type="danger"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.disable') }}
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
          :disabled="row.root === 0"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="delData(row, false)"
        >
          {{ t('common.del') }}
        </ElLink>
        <ElLink
          :disabled="row.root === 0"
          :underline="false"
          type="danger"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.passwordSetting') }}
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
