<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElTag, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getStaffInfoApi,
  postStaffInfoApi,
  putStaffInfoApi,
  deleteStaffInfoApi
} from '@/api/adminStaffManager/staffInfo'
import { StaffInfoData } from '@/api/adminStaffManager/staffInfo/types'
import { dateNumFormat } from '@/utils'

const { t } = useI18n()

const workOrderType = [
  { label: t('common.untreated'), value: 1 },
  { label: t('common.processed'), value: 2 },
  { label: t('common.canNotDispose'), value: 0 }
]

const { register, tableObject, methods } = useTable<StaffInfoData>({
  getListApi: getStaffInfoApi,
  delListApi: deleteStaffInfoApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList } = methods

getList()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('common.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: t('workOrder.initiator'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'content',
    label: t('workOrder.content'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'type',
    label: t('workOrder.type'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'principal',
    label: t('workOrder.principal'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'estimatedTimeOfCompletion',
    label: t('workOrder.estimatedTimeOfCompletion'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'workorderexecutioninstructions',
    label: t('workOrder.workorderexecutioninstructions'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'workOrderExecutionImage',
    label: t('workOrder.workOrderExecutionImage'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'status',
    label: t('common.status'),
    form: {
      colProps: { span: 24 },
      value: '1',
      component: 'Radio',
      componentProps: { options: workOrderType }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        { type: cellValue === 0 ? 'danger' : cellValue === 1 ? 'warning' : 'success' },
        () => t(cellValue === 1 ? 'common.enable' : 'common.disable')
      )
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

const AddAction = () => {
  dialogTitle.value = t('common.add')
  actionType.value = ''
  tableObject.currentRow = null
  dialogVisible.value = true
}

const action = (row: StaffInfoData, type: string) => {
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
      const data = (await write?.getFormData()) as StaffInfoData
      let api = putStaffInfoApi
      if (!data.id) {
        api = postStaffInfoApi
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

// const delData = async (row: StaffInfoData | null, multiple: boolean) => {
//   tableObject.currentRow = row
//   const { delList, getSelections } = methods
//   const selections = await getSelections()
//   await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
// }
</script>

<template>
  <ContentWrap>
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
        <!-- <ElLink
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
        </ElLink> -->
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'epidemic')"
        >
          {{ t('common.epidemic') }}
        </ElLink>
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'ticket')"
        >
          {{ t('common.ticket') }}
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
