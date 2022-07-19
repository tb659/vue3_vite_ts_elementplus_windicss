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
  getTouristInfoApi,
  postTouristInfoApi,
  putTouristInfoApi,
  deleteTouristInfoApi
} from '@/api/adminTouristManager/touristInfo'
import { TouristInfoData } from '@/api/adminTouristManager/touristInfo/types'
import { dateNumFormat } from '@/utils'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const { register, tableObject, methods } = useTable<TouristInfoData>({
  getListApi: getTouristInfoApi,
  delListApi: deleteTouristInfoApi,
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
    field: 'nikeName',
    label: t('touristManager.touristNickName'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'name',
    label: t('touristManager.touristName'),
    search: { show: true },
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'idType',
    label: t('touristManager.idType'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'idNo',
    label: t('touristManager.idNo'),
    form: {
      colProps: { span: 22 }
    }
  },
  {
    field: 'lastVisitTime',
    label: t('common.lastVisitTime'),
    form: { show: false }
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

const action = (row: TouristInfoData, type: string) => {
  if (type === 'epidemic') {
    return push('/tourist-manager/epidemic-manager')
  } else if (type === 'ticket') {
    return push('/tourist-manager/tickets-manager')
  }
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
      const data = (await write?.getFormData()) as TouristInfoData
      let api = postTouristInfoApi
      if (data.id) {
        api = putTouristInfoApi
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

// const delData = async (row: TouristInfoData | null, multiple: boolean) => {
//   tableObject.currentRow = row
//   const { delList, getSelections } = methods
//   const selections = await getSelections()
//   await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
// }
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
        <!-- <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'edit')"
        >
          {{ t('common.edit') }}
        </ElLink> -->
        <!-- <ElLink
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
