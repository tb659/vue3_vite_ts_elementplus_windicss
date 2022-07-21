<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
// import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import {
  /* ElButton, */ ElMessage,
  ElMessageBox,
  ElLink,
  ElTag /* , ElUpload */
} from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { /* ref, unref, */ reactive } from 'vue'
// import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getEpidemicManagerApi,
  deleteEpidemicManagerApi,
  // postEpidemicManagerApi,
  // putEpidemicManagerApi,
  approvalEpidemicManagerApi
} from '@/api/adminTouristManager/epidemicManager'
import { EpidemicManager } from '@/api/adminTouristManager/epidemicManager/types'
// import { getTouristInfoApi } from '@/api/adminTouristManager/touristInfo'
// import { TouristInfoData } from '@/api/adminTouristManager/touristInfo/types'
import { dateNumFormat } from '@/utils'
import { REQUEST_URL } from '@/config/axios/config'
import { useDesign } from '@/hooks/web/useDesign'
// import type { UploadProps } from 'element-plus'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('epidemic-manager')

const { t } = useI18n()

// overdue, awaiting_approval, approved, rejected
const auditType = [
  { label: t('common.toAudit'), value: 'awaiting_approval' },
  { label: t('common.aduit'), value: 'approved' },
  { label: t('common.expired'), value: 'overdue' },
  { label: t('common.fail'), value: 'rejected' }
]

const formatData = () => {
  tableObject.tableList.forEach((item) => {
    let img: string[] = []
    let imgs: Img[] = []
    item['imgs'] = ''
    item['imgList'] = [] as Img[]
    for (let i = 1; i < 10; i++) {
      imgs[i] = item['imagePath' + i]
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
    item['name'] = item.tourist?.name || ''
    item['nickName'] = item.tourist?.nikeName || ''
    item['idType'] = item.tourist?.idType || ''
    item['idNo'] = item.tourist?.idNo || ''
  })
}

const { register, tableObject, methods } = useTable<EpidemicManager>({
  getListApi: getEpidemicManagerApi,
  delListApi: deleteEpidemicManagerApi,
  response: { rows: 'rows', total: 'total' },
  customEvent: formatData
})

const { getList, setSearchParams } = methods

const getData = async () => {
  await getList()
}
getData()

const searchData = async (form) => {
  if (!form) return
  let data = Object.assign({}, form)
  data.submitTimeStart = form.dateTime[0]
  data.submitTimeEnd = form.dateTime[1]
  delete data.dataTime
  await setSearchParams(data)
}

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
    form: { show: false }
  },
  {
    field: 'nickName',
    label: t('touristManager.touristNickName'),
    search: { show: true },
    form: {
      colProps: { span: 22 },
      show: false
    }
  },
  {
    field: 'name',
    label: t('touristManager.touristName'),
    search: { show: true },
    form: {
      colProps: { span: 22 },
      show: false
    }
  },
  {
    field: 'imgs',
    width: '300px',
    label: `${t('touristManager.imageUpload')}`,
    form: {
      component: 'Uploaders',
      colProps: { span: 22 },
      componentProps: {
        limit: 4
      }
    }
  },
  {
    field: 'imagePath1',
    label: `${t('touristManager.imageUpload')}1`,
    form: {
      show: false,
      component: 'Uploader',
      colProps: { span: 11 }
    },
    table: { show: false }
  },
  {
    field: 'imagePath2',
    label: `${t('touristManager.imageUpload')}2`,
    form: {
      show: false,
      component: 'Uploader',
      colProps: { span: 11 }
    },
    table: { show: false }
  },
  {
    field: 'imagePath3',
    label: `${t('touristManager.imageUpload')}3`,
    form: {
      show: false,
      component: 'Uploader',
      colProps: { span: 11 }
    },
    table: { show: false }
  },
  {
    field: 'imagePath4',
    label: `${t('touristManager.imageUpload')}4`,
    form: {
      show: false,
      component: 'Uploader',
      colProps: { span: 11 }
    },
    table: { show: false }
  },
  {
    field: 'touristId',
    label: t('touristManager.touristName'),
    form: {
      colProps: { span: 22 },
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: []
      }
    },
    table: { show: false }
  },
  {
    field: 'dateTime',
    label: t('touristManager.dateTime'),
    search: {
      show: true,
      value: [],
      component: 'DatePicker',
      componentProps: {
        type: 'daterange',
        startPlaceholder: t('touristManager.beginTime'),
        endPlaceholder: t('touristManager.endTime'),
        valueFormat: 'YYYY-MM-DD HH:mm'
      }
    },
    form: {
      value: [],
      colProps: { span: 22 },
      show: false,
      component: 'DatePicker',
      componentProps: {
        type: 'daterange',
        startPlaceholder: t('touristManager.beginTime'),
        endPlaceholder: t('touristManager.endTime'),
        valueFormat: 'YYYY-MM-DD HH:mm'
      }
    },
    table: { show: false }
  },
  {
    field: 'idType',
    label: t('touristManager.idType'),
    form: {
      colProps: { span: 22 },
      show: false
    }
  },
  {
    field: 'idNo',
    width: '200px',
    label: t('touristManager.idNo'),
    form: {
      colProps: { span: 22 },
      show: false
    }
  },
  {
    field: 'submitTime',
    label: t('touristManager.submitTime'),
    form: { show: false },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return cellValue ? dateNumFormat(cellValue) : ''
    }
  },
  {
    field: 'status',
    label: t('touristManager.auditStatus'),
    // search: {
    //   show: true,
    //   component: 'Select',
    //   componentProps: { options: auditType }
    // },
    form: {
      colProps: { span: 22 },
      component: 'Select',
      componentProps: { options: auditType },
      show: false
    }
  },
  {
    field: 'approvalTime',
    label: t('touristManager.auditTime'),
    form: { show: false }
    // formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
    //   return cellValue ? dateNumFormat(cellValue) : ''
    // }
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

// const actionType = ref('')

// const dialogVisible = ref(false)

// const dialogTitle = ref('')

// const AddAction = async () => {
//   await updateSchemas()
//   dialogTitle.value = t('common.add')
//   actionType.value = ''
//   tableObject.currentRow = null
//   dialogVisible.value = true
// }

// const action = async (row: EpidemicManager, type: string) => {
//   await updateSchemas()
//   dialogTitle.value = t(type === 'edit' ? 'common.edit' : 'common.detail')
//   actionType.value = type
//   tableObject.currentRow = row
//   dialogVisible.value = true
// }

// const writeRef = ref<ComponentRef<typeof Write>>()

// const loading = ref(false)

// const save = async () => {
//   const write = unref(writeRef)
//   await write?.elFormRef?.validate(async (isValid) => {
//     if (isValid) {
//       loading.value = true
//       const data = (await write?.getFormData()) as EpidemicManager
//       let api = postEpidemicManagerApi
//       if (data.id) {
//         api = putEpidemicManagerApi
//       }
//       let params = {} as EpidemicManager
//       if (data.imgs) {
//         const imgs = JSON.parse(data.imgs)
//         for (let i = 1; i <= 4; i++) {
//           data['imagePath' + i] = imgs[i - 1] || ''
//         }
//         for (const key in data) {
//           if (key !== ' imgs' && key !== 'imgList') {
//             params[key] = data[key]
//           }
//         }
//       } else {
//         params = data
//       }
//       const res = await api(params)
//         .catch(() => {})
//         .finally(() => {
//           loading.value = false
//         })
//       if (res) {
//         ElMessage.success(t('common.saveSuccess'))
//         dialogVisible.value = false
//         tableObject.currentPage = 1
//         await getList()
//       }
//     }
//   })
// }

const delData = async (row: EpidemicManager | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
}

const aduit = async (id: number) => {
  ElMessageBox.confirm(t('common.auditMessage'), t('common.delWarning'), {
    confirmButtonText: t('common.ok'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    const res = await approvalEpidemicManagerApi(id)
    if (res) {
      ElMessage.success(t('touristManager.auditSuccess'))
      tableObject.currentPage = 1
      await getList()
    }
  })
}

// const touristListData = ref<TouristInfoData[]>([])

// const updateSchemas = async () => {
//   if (touristListData.value.length) return
//   const res = await getTouristInfoApi({ page: 1, size: 999 })
//   if (res) {
//     touristListData.value = res.data.rows
//     const keys = ['formSchema']
//     keys.forEach((key) => {
//       allSchemas[key].filter((schema) => schema.field === 'touristId')[0].componentProps!.options =
//         touristListData.value.map((item) => {
//           return { label: item.name, value: item.id }
//         })
//     })
//   }
// }
// const imageUrl = ref('')

// const imageVisible = ref(false)

// // 预览图
// const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
//   imageUrl.value = uploadFile.url!
//   console.log(imageUrl.value)
//   imageVisible.value = true
// }
</script>

<template>
  <ContentWrap :class="prefixCls">
    <Search :schema="allSchemas.searchSchema" @search="searchData" @reset="searchData" />

    <!-- <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">
        <Icon icon="akar-icons:circle-plus" class="mr-5px" />
        {{ t('common.add') }}
      </ElButton>
    </div> -->

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
      :custom-event="formatData"
    >
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
        <!-- <ElUpload
          v-model:file-list="row.imgList"
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
        >
          <Icon icon="akar-icons:circle-plus" class="mr-5px" />
        </ElUpload> -->
      </template>
      <template #status="{ row }">
        <!-- 
          { label: t('common.toAudit'), value: 'awaiting_approval' },
          { label: t('common.aduit'), value: 'approved' },
          { label: t('common.expired'), value: 'overdue' },
          { label: t('common.fail'), value: 'rejected' }
       -->
        <ElTag v-if="row.approvalStatus === 'awaiting_approval'">
          {{ t('common.toAudit') }}
        </ElTag>
        <ElTag type="success" v-else-if="row.approvalStatus === 'approved'">
          {{ t('common.hasAduit') }}
        </ElTag>
        <ElTag type="danger" v-else-if="row.approvalStatus === 'overdue'">
          {{ t('common.expired') }}
        </ElTag>
        <ElTag type="danger" v-else-if="row.approvalStatus === 'rejected'">
          {{ t('common.fail') }}
        </ElTag>
      </template>

      <template #action="{ row }">
        <!-- <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.edit') }}
        </ElLink> -->
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="delData(row, false)"
        >
          {{ t('common.del') }}
        </ElLink>
        <ElLink
          v-show="row.approvalStatus === 'awaiting_approval'"
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="aduit(row.id)"
        >
          {{ t('common.aduit') }}
        </ElLink>
      </template>
    </Table>
  </ContentWrap>

  <!-- <Dialog v-model="dialogVisible" :title="dialogTitle">
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
  </Dialog> -->

  <!-- <Dialog v-model="imageVisible" :title="'预览'">
    <div>
      <img style="width: 100%" :src="imageUrl" alt="" />
    </div>
    <template #footer>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog> -->
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-epidemic-manager';

// .@{prefix-cls} {
//   .el-upload-list__item {
//     width: 60px;
//     height: 60px;
//   }

//   .el-upload--picture-card {
//     display: none;
//   }

//   .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
//     display: none;
//   }
// }
//
</style>
