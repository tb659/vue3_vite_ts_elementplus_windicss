<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
// 表单组件
import { Search } from '@/components/Search'
// 弹窗组件
import { Dialog } from '@/components/Dialog'
// 引入配置中英文的组件
import { useI18n } from '@/hooks/web/useI18n'
// 引入element plus 的button和tag组件
import { ElButton, ElTag } from 'element-plus'
// 引入请求方法
import { getTableListApi, saveTableApi, delTableListApi } from '@/api/table'
// 引入表格组件
import { Table } from '@/components/Table'
// 引入和table配套的页面
import { useTable } from '@/hooks/web/useTable'
// 引入和表格数据配套的接口（interface/type）
import { TableData } from '@/api/table/types'
// 引入vue自带的功能
import { h, ref, unref, reactive } from 'vue'
// 引入弹窗里面的主体内容
import Write from './components/Write.vue'
// 引入弹窗里面详情的数据
import Detail from './components/Detail.vue'
/* 
  useCrudSchemas  --对各种数据进行过滤的方法（统一处理）
  CrudSchema      --对数据进行约束的类型
*/
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

/*
    TODO tableObject
    pageSize      ---页数
    currentPage   ---当前页
    total         ---总条数
    tableList     ---表格数据
    AxiosConfig   ---配置
    params: {},   ---参数
    loading       ---加载中（boolean）
    currentRow    ---当前行的数据
 */
/*
    TODO methods 方法
    delList           ---删除数据 multiple选中复选框选择的
    getList           ---请求数据
    getSelections
    setColumn
    setProps
    setSearchParams
*/
const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi, //getListApi--查询表格数据的方法 getTableListApi为创建的API接口
  delListApi: delTableListApi, //delListApi--删除表格数据的方法 delTableListApi为创建的API接口
  response: { rows: 'rows', total: 'total' }
})

/*
  getList 初始化请求数据
  setSearchParams  search请求数据
*/
const { getList, setSearchParams } = methods
// 初始化请求表格数据
getList()
// 解构中英文设置
const { t } = useI18n()
// 创建表格内容
const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('common.index'),
    type: 'index',
    form: {
      show: false
    },
    detail: {
      show: false
    }
  },
  {
    field: 'title',
    label: t('tableDemo.title'),
    search: {
      show: true
    },
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'author',
    label: t('tableDemo.author')
  },
  {
    field: 'display_time',
    label: t('tableDemo.displayTime'),
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm'
      }
    }
  },
  {
    field: 'importance',
    label: t('tableDemo.importance'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () =>
          cellValue === 1
            ? t('tableDemo.important')
            : cellValue === 2
            ? t('tableDemo.good')
            : t('tableDemo.commonly')
      )
    },
    form: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '重要',
            value: 3
          },
          {
            label: '良好',
            value: 2
          },
          {
            label: '一般',
            value: 1
          }
        ]
      }
    }
  },
  {
    field: 'pageviews',
    label: t('tableDemo.pageviews'),
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    field: 'content',
    label: t('exampleDemo.content'),
    table: {
      show: false
    },
    form: {
      component: 'Editor',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action'),
    form: {
      show: false
    },
    detail: {
      show: false
    }
  }
])
/* 
  使用useCrudSchemas对创建的表格进行处理   =>allSchemas
  detailSchema    --弹窗详情的数据 （详情）
  formSchema      --弹窗表单的数据 （新增、编辑）
  searchSchema    --search 的数据
  tableColumns    --列表的表头
*/
const { allSchemas } = useCrudSchemas(crudSchemas)

// 控制弹窗是否显示的布尔
const dialogVisible = ref(false)
// 弹窗标题
const dialogTitle = ref('')
// 打开新增弹窗
const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add') // 设置弹窗标题类型为新增
  actionType.value = '' // 将弹窗的类型置空
  tableObject.currentRow = null // 当前行的数据
  dialogVisible.value = true //打开弹窗
}

// 搜索栏删除按钮loading图标的布尔
const delLoading = ref(false)
/*
  点击搜索栏和表格触发的删除事件
  row         null--搜索栏 有值--表格
  multiple    true--搜索栏  false--表格
*/
const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row //设置当前行的数据为点击的当前行
  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true // 搜索栏删除按钮loading打开
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

// 弹窗的类型
const actionType = ref('')
const action = (row: TableData, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail') // 设置弹窗的标题是编辑还是详情
  actionType.value = type //设置弹窗的类型根据点击的按钮决定--编辑/详情
  tableObject.currentRow = row //设置当前行的数据为点击的当前行
  dialogVisible.value = true //打开弹窗
}

// 弹窗或者表单的主体内容ref元素
const writeRef = ref<ComponentRef<typeof Write>>()
// loading 表单的保存按钮的loading
const loading = ref(false)
//  保存事件
const save = async () => {
  // 将writeRef设置为只读
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true // loading 表单的保存按钮的loading打开
      const data = (await write?.getFormData()) as TableData
      const res = await saveTableApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false //关闭表单保存按钮保存的loading
        })
      if (res) {
        dialogVisible.value = false //关闭弹窗
        tableObject.currentPage = 1
        getList() //重新请求数据
      }
    }
  })
}
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('exampleDemo.del') }}
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
        <ElButton type="primary" @click="action(row, 'edit')">
          {{ t('exampleDemo.edit') }}
        </ElButton>
        <ElButton type="success" @click="action(row, 'detail')">
          {{ t('exampleDemo.detail') }}
        </ElButton>
        <ElButton type="danger" @click="delData(row, false)">
          {{ t('exampleDemo.del') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
  <!--  dialogVisible --弹窗是否展示
        title --弹窗标题  -->
  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <!-- actionType !== detail 在编辑或者新增时展示 -->
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="tableObject.currentRow"
    />
    <!-- 点击详情时展示 -->
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
