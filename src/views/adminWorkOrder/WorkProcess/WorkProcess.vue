<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElTag, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { h, ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getWorkOrderApi,
  postWorkOrderApi,
  putWorkOrderApi,
  deleteWorkOrderApi
} from '@/api/adminWorkOrder/workProcess'
import { WorkOrderData } from '@/api/adminWorkOrder/workProcess/types'
import { getStaffInfoApi } from '@/api/adminStaffManager/staffInfo'
import { StaffInfoData } from '@/api/adminStaffManager/staffInfo/types'
import { dateNumFormat } from '@/utils'
import { REQUEST_URL } from '@/config/axios/config'
import { workOrderStatus } from '@/utils/common'

const { t } = useI18n()

const formatData = () => {
  tableObject.tableList.forEach((item) => {
    let img: string[] = []
    item['imgs'] = ''
    item['imgList'] = [] as Img[]
    let imgs: Img[] = []
    for (let i = 1; i < 10; i++) {
      imgs[i] = item['workOrderExecutionImg' + i]
    }
    imgs = imgs.filter((img) => img)
    imgs.forEach((imgItem) => {
      img.push(imgItem + '')
      item['imgList'].push({
        name: Math.random() + '',
        uid: Math.random() * 10,
        url: REQUEST_URL + imgItem
      })
    })
    item['imgs'] = img.length ? JSON.stringify(img) : '[]'
  })
}

const { register, tableObject, methods } = useTable<WorkOrderData>({
  getListApi: getWorkOrderApi,
  delListApi: deleteWorkOrderApi,
  response: { rows: 'rows', total: 'total' },
  customEvent: formatData
})

const { getList } = methods

const getData = async () => {
  await getList()
}
getData()

interface Img {
  name: string
  uid: number
  url: string
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('common.index'),
    type: 'index',
    form: { show: false },
    detail: { show: false }
  },
  {
    field: 'submitterId',
    label: t('workOrder.initiator'),
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
    field: 'workOrderContent',
    label: t('workOrder.content'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'workOrderType',
    label: t('workOrder.type'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'assignerId',
    label: t('workOrder.principal'),
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
    field: 'scheduledFinishTime',
    width: '160px',
    label: t('workOrder.estimatedTimeOfCompletion'),
    form: {
      colProps: { span: 11 },
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm'
      }
    }
  },
  {
    field: 'actualFinishTime',
    label: t('workOrder.finishedTimeOfCompletion'),
    width: '160px',
    form: {
      colProps: { span: 11 },
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm'
      }
    }
  },
  {
    field: 'workOrderExecutionContent',
    label: t('workOrder.workorderexecutioninstructions'),
    width: '160px',
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'imgs',
    label: t('workOrder.workOrderExecutionImage'),
    width: '300px',
    form: {
      component: 'Uploaders',
      colProps: { span: 22 },
      componentProps: {
        limit: 6
      }
    }
  },
  {
    field: 'workOrderStatus',
    label: t('common.status'),
    form: {
      colProps: { span: 22 },
      value: 'unprocessed',
      component: 'Radio',
      componentProps: { options: workOrderStatus }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      return h(
        ElTag,
        {
          type: cellValue === 'unprocessed' ? '' : cellValue === 'processed' ? 'success' : 'warning'
        },
        () =>
          t(
            cellValue === 'unprocessed'
              ? 'common.untreated'
              : cellValue === 'processed'
              ? 'common.processed'
              : 'common.canNotDispose'
          )
      )
    }
  },
  {
    field: 'crtTime',
    width: '160px',
    label: t('common.createTime'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return dateNumFormat(cellValue)
    }
  },
  {
    field: 'action',
    width: '140px',
    label: t('tableDemo.action'),
    form: { show: false },
    detail: { show: false }
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

const action = async (row: WorkOrderData, type: string) => {
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
      const data = (await write?.getFormData()) as WorkOrderData
      let api = postWorkOrderApi
      if (data.id) {
        api = putWorkOrderApi
      }
      let params = {} as WorkOrderData
      if (data.imgs) {
        const imgs = JSON.parse(data.imgs)
        for (let i = 1; i <= 6; i++) {
          data['workOrderExecutionImg' + i] = imgs[i - 1] || ''
        }
        for (const key in data) {
          if (key !== 'imgs' && key !== 'imgList') {
            params[key] = data[key]
          }
        }
      } else {
        params = data
      }
      const res = await api(params)
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

// const delData = async (row: WorkOrderData | null, multiple: boolean) => {
//   tableObject.currentRow = row
//   const { delList, getSelections } = methods
//   const selections = await getSelections()
//   await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
// }

const staffInfoData = ref<StaffInfoData[]>([])

const updateSchemas = async () => {
  if (staffInfoData.value.length) return
  const res = await getStaffInfoApi({ page: 1, size: 999 })
  if (res) {
    staffInfoData.value = res.data.rows
    const keys = ['formSchema']
    const ids = ['submitterId', 'assignerId']
    keys.forEach((key) => {
      ids.forEach((id) => {
        allSchemas[key].filter((schema) => schema.field === id)[0].componentProps!.options =
          staffInfoData.value.map((item) => {
            return { label: item.name, value: item.id }
          })
      })
    })
  }
}
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
      <template #submitterId="{ row }">
        {{ row.submitter?.name }}
      </template>
      <template #assignerId="{ row }">
        {{ row.assigner?.name }}
      </template>
      <template #imgs="{ row }">
        <div class="flex">
          <img
            width="60"
            class="m-2px"
            v-for="item in row.imgList"
            :key="item.uid"
            :src="item.url"
            alt=""
          />
        </div>
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
          @click="action(row, 'detail')"
        >
          {{ t('common.detail') }}
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

    <Detail
      v-if="actionType === 'detail'"
      :detail-schema="allSchemas.detailSchema"
      :current-row="tableObject.currentRow"
    />

    <template #footer>
      <ElButton v-if="actionType !== 'detail'" type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>
