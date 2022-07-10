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
  getUserListApi,
  deleteUserApi,
  postUserApi,
  putUserApi,
  putUserEnableApi,
  putUserDisableApi,
  putPasswordApi
} from '@/api/adminSystemManager/user'
import { UserData } from '@/api/adminSystemManager/user/types'
import { getRoleListApi } from '@/api/adminSystemManager/role'
import { dateNumFormat } from '@/utils'
import { useAppStore } from '@/store/modules/app'
import { useCache } from '@/hooks/web/useCache'

const { register, tableObject, methods } = useTable<UserData>({
  getListApi: getUserListApi,
  delListApi: deleteUserApi,
  enableApi: putUserEnableApi,
  disableApi: putUserDisableApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

getList()

const { t } = useI18n()

const appStore = useAppStore()

const { wsCache } = useCache()

const userInfo = wsCache.get(appStore.getUserInfo)

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('common.index'),
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
    field: 'newPassword',
    label: t('systemManager.newPassword'),
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
    field: 'confirmPassword',
    label: t('systemManager.confirmPassword'),
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
      value: [],
      component: 'Select',
      componentProps: {
        multiple: true,
        style: { width: '100%' },
        options: []
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
      return h(ElTag, { type: cellValue === 1 ? '' : 'danger' }, () =>
        t(cellValue === 1 ? 'common.enable' : 'common.disable')
      )
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
      value: 1,
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

const actionType = ref('')

const dialogVisible = ref(false)

const dialogTitle = ref('')

const AddAction = async () => {
  tableObject.currentRow = null
  await updateSchemas()
  dialogTitle.value = t('common.add')
  actionType.value = ''
  dialogVisible.value = true
}

const action = async (row: UserData, type: string) => {
  if (type === 'password' && row.id !== userInfo.id) {
    return ElMessage.warning(t('common.canNotOperation'))
  }
  tableObject.currentRow = row
  await updateSchemas(row, type)
  dialogTitle.value = t(type === 'edit' ? 'common.edit' : 'systemManager.passwordSetting')
  actionType.value = type
  dialogVisible.value = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as UserData
      let putData = {}
      let api = postUserApi
      if (data.id) {
        if (actionType.value === 'password') {
          api = putPasswordApi
          putData = {
            userId: data.id,
            newPassword: data.newPassword
          }
        } else {
          api = putUserApi
          putData = {
            id: data.id,
            dataVersion: data.dataVersion,
            roleList: data.roleList,
            status: data.status,
            username: data.username
          }
        }
      }
      console.log(data)
      const res = await api(data.id ? putData : data)
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

const delData = async (row: UserData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
}

const enableData = async (row: UserData) => {
  const { enableItem } = methods
  await enableItem(row.id)
}

const disableData = async (row: UserData) => {
  const { disableItem } = methods
  await disableItem(row.id)
}

const updateSchemas = async (row: UserData | undefined = undefined, type = 'edit') => {
  if (type === 'password') {
    allSchemas.formSchema.filter((schema) => schema.field === 'newPassword')[0].hidden = false
    allSchemas.formSchema.filter((schema) => schema.field === 'confirmPassword')[0].hidden = false
    allSchemas.formSchema
      .filter((schema) => schema.field !== 'newPassword' && schema.field !== 'confirmPassword')
      .forEach((schema) => (schema.hidden = true))
  } else {
    allSchemas.formSchema.filter((schema) => schema.field === 'newPassword')[0].hidden = true
    allSchemas.formSchema.filter((schema) => schema.field === 'confirmPassword')[0].hidden = true
    allSchemas.formSchema
      .filter((schema) => schema.field !== 'newPassword' && schema.field !== 'confirmPassword')
      .forEach((schema) => (schema.hidden = false))
    allSchemas.formSchema.filter((schema) => schema.field === 'password')[0].hidden = row
      ? true
      : false
    const res = await getRoleListApi({ page: 1, size: 99 })
    if (res) {
      allSchemas.formSchema.filter(
        (schema) => schema.field === 'roleList'
      )[0].componentProps!.options = res.data.rows.map((item) => {
        return { label: item.name, value: item.id }
      })
      allSchemas.formSchema.filter((schema) => schema.field === 'roleList')[0].value = row
        ? row.roleList || []
        : []
    }
  }
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
        <ElLink
          :disabled="row.root === 0"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'password')"
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
