<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElLink, ElTag, ElMessage } from 'element-plus'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { ref, unref, reactive, h } from 'vue'
import Write from './components/Write.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import {
  getShopInfoApi,
  postShopInfoApi,
  putShopInfoApi,
  deleteShopInfoApi
} from '@/api/adminShopManager/shopInfo'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { requestUrl } from '@/config/axios/config'
import { dateNumFormat } from '@/utils'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const { register, tableObject, methods } = useTable<ShopInfoData>({
  getListApi: getShopInfoApi,
  delListApi: deleteShopInfoApi,
  response: { rows: 'rows', total: 'total' }
})

const { getList, setSearchParams } = methods

setSearchParams({ mchCategory: 'venue' })

// getList()

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('common.index'),
    type: 'index',
    form: { show: false },
    detail: { show: false }
  },
  {
    field: 'name',
    label: t('venueManager.venueName'),
    search: { show: true },
    form: {
      colProps: { span: 24 }
    },
    detail: { span: 24 }
  },
  {
    field: 'introduction',
    label: t('shopManager.richTextInfo'),
    form: {
      colProps: { span: 24 },
      component: 'Editor',
      componentProps: { style: { width: '100%' } }
    }
  },
  {
    field: 'mchType',
    width: '120px',
    label: t('shopManager.shopType'),
    form: {
      colProps: { span: 24 },
      component: 'Select',
      componentProps: {
        style: { width: '100%' },
        options: [
          { label: '商户', value: 'shop' },
          { label: '场馆', value: 'venue' }
        ]
      }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      return h(ElTag, {}, () => t(cellValue === 'venue' ? '商户' : '场馆'))
    }
  },
  {
    field: 'tips',
    label: t('common.tips'),
    form: {
      value: 'tips',
      colProps: { span: 24 }
    },
    table: { show: false }
  },
  {
    field: 'gis',
    label: t('shopManager.mapPosition'),
    form: {
      colProps: { span: 24 }
    }
  },
  {
    field: 'payQrCode',
    width: '120px',
    label: t('shopManager.payQrCode'),
    form: {
      colProps: { span: 24 },
      component: 'Uploader',
      componentProps: {
        accessLevel: 'PUBLIC'
      }
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
    field: 'tipTemplate',
    label: t('shopManager.tipInfoForBuy'),
    form: {
      colProps: { span: 24 },
      componentProps: { type: 'textarea' }
    }
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

const actionType = ref('')

const dialogVisible = ref(false)

const dialogTitle = ref('')

const AddAction = () => {
  dialogTitle.value = t('common.add')
  actionType.value = ''
  tableObject.currentRow = null
  dialogVisible.value = true
}

const action = (row: ShopInfoData, type: string) => {
  if (type === 'lease') return push('/venue-manager/lease-good')
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
      const data = (await write?.getFormData()) as ShopInfoData
      data.mchCategory = 'venue'
      let api = putShopInfoApi
      if (!data.id) {
        api = postShopInfoApi
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

const delData = async (row: ShopInfoData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  await delList(multiple ? selections.map((v) => v.id) : [tableObject.currentRow!.id], multiple)
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
      <template #payQrCode="{ row }">
        <img
          class="w-80px"
          :src="`${requestUrl}${row.payQrCode}`"
          :alt="`${requestUrl}${row.payQrCode}`"
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
        <ElLink
          :underline="false"
          type="primary"
          class="ml-10px cursor-pointer"
          @click="action(row, 'lease')"
        >
          {{ t('common.lease') }}
        </ElLink>
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle" maxHeight="1000px" width="1600px">
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
