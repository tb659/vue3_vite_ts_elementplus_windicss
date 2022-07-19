import { Table, TableExpose } from '@/components/Table'
import { ElTable, ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, watch, computed, unref, nextTick } from 'vue'
import { get } from 'lodash-es'
import type { TableProps } from '@/components/Table/src/types'
import { useI18n } from '@/hooks/web/useI18n'
import { listToTree } from '@/utils/tree'

const { t } = useI18n()

interface TableResponse<T = any> {
  page: number
  rows: T[]
  size: number
  total: number
}

interface UseTableConfig<T = any> {
  getListApi?: (option: any) => Promise<IResponse<TableResponse<T>>>
  delListApi?: (option: any) => Promise<IResponse>
  enableApi?: (option: any) => Promise<IResponse>
  disableApi?: (option: any) => Promise<IResponse>
  onShelfApi?: (option: any) => Promise<IResponse>
  offShelfApi?: (option: any) => Promise<IResponse>
  // 返回数据格式配置
  response?: {
    rows?: string
    total?: string
  }
  props?: TableProps
  customEvent?: Function
}

interface TableObject<T = any> {
  pageSize: number
  currentPage: number
  total: number
  tableList: T[]
  params: any
  loading: boolean
  currentRow: Nullable<T>
  isTreeList: boolean
}

export const useTable = <T = any>(config?: UseTableConfig<T>) => {
  const tableObject = reactive<TableObject<T>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 10,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    params: {},
    // 加载中
    loading: true,
    // 当前行的数据
    currentRow: null,
    // 树形列表
    isTreeList: false
  })

  const paramsObj = computed(() => {
    return {
      ...tableObject.params,
      size: tableObject.pageSize,
      page: tableObject.currentPage
    }
  })

  watch(
    () => tableObject.currentPage,
    () => {
      methods.getList()
    }
  )

  watch(
    () => tableObject.pageSize,
    () => {
      // 当前页不为1时，修改页数后会导致多次调用getList方法
      if (tableObject.currentPage === 1) {
        methods.getList()
      } else {
        tableObject.currentPage = 1
        methods.getList()
      }
    }
  )

  // Table实例
  const tableRef = ref<typeof Table & TableExpose>()

  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: typeof Table & TableExpose, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = elRef
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  const delData = async (ids: string[] | number[]) => {
    const res = await (config?.delListApi && config?.delListApi(ids))
    if (res) {
      ElMessage.success(t('common.delSuccess'))

      // 计算出临界点
      const currentPage =
        tableObject.total % tableObject.pageSize === ids.length || tableObject.pageSize === 1
          ? tableObject.currentPage > 1
            ? tableObject.currentPage - 1
            : tableObject.currentPage
          : tableObject.currentPage

      tableObject.currentPage = currentPage
      await methods.getList()
    }
  }
  // TODO 声明的methods对象
  const enableData = async (id: number) => {
    const res = await (config?.enableApi && config?.enableApi(id))
    if (res) {
      ElMessage.success(t('common.enableSuccess'))
      methods.getList()
    }
  }

  const disableData = async (id: number) => {
    const res = await (config?.disableApi && config?.disableApi(id))
    if (res) {
      ElMessage.success(t('common.disableSuccess'))
      await methods.getList()
    }
  }

  const onShelfData = async (id: number) => {
    const res = await (config?.onShelfApi && config?.onShelfApi(id))
    if (res) {
      ElMessage.success(t('common.onShelfSuccess'))
      await methods.getList()
    }
  }

  const offShelfData = async (id: number) => {
    const res = await (config?.offShelfApi && config?.offShelfApi(id))
    if (res) {
      ElMessage.success(t('common.offShelfSuccess'))
      await methods.getList()
    }
  }

  const methods = {
    getList: async () => {
      tableObject.loading = true
      paramsObj.value.size = tableObject.isTreeList ? 99 : paramsObj.value.size
      const res = await (config?.getListApi &&
        config?.getListApi(unref(paramsObj)).finally(() => {
          tableObject.loading = false
        }))
      if (res) {
        const data = res.data
        data.rows = tableObject.isTreeList ? listToTree(res.data.rows) : res.data.rows
        tableObject.tableList = get(data || {}, config?.response?.rows as string)
        tableObject.total = get(data || {}, config?.response?.total as string) || 0
      }
      config?.customEvent && config?.customEvent()
    },
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },
    setColumn: async (columnProps: TableSetPropsType[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },
    getSelections: async () => {
      const table = await getTable()
      return (table?.selections || []) as T[]
    },
    // 与Search组件结合
    setSearchParams: async (data: Recordable) => {
      tableObject.currentPage = 1
      tableObject.params = Object.assign(tableObject.params, {
        size: tableObject.pageSize,
        page: tableObject.currentPage,
        ...data
      })
      await methods.getList()
    },
    // 删除数据
    delList: async (ids: string[] | number[], multiple = false, message = true) => {
      const table = await getTable()
      if (multiple) {
        if (!table?.selections.length) {
          ElMessage.warning(t('common.delNoData'))
          return
        }
      } else {
        if (!tableObject.currentRow) {
          ElMessage.warning(t('common.delNoData'))
          return
        }
      }
      if (message) {
        ElMessageBox.confirm(t('common.delMessage'), t('common.delWarning'), {
          confirmButtonText: t('common.ok'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }).then(async () => {
          await delData(ids)
        })
      } else {
        await delData(ids)
      }
    },
    // 启用
    enableItem: async (id: number, message = true) => {
      if (message) {
        ElMessageBox.confirm(t('common.enableMessage'), t('common.enableWarning'), {
          confirmButtonText: t('common.ok'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }).then(async () => {
          await enableData(id)
        })
      } else {
        await enableData(id)
      }
    },
    // 禁用
    disableItem: async (id: number, message = true) => {
      if (message) {
        ElMessageBox.confirm(t('common.disableMessage'), t('common.disableWarning'), {
          confirmButtonText: t('common.ok'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }).then(async () => {
          await disableData(id)
        })
      } else {
        await disableData(id)
      }
    },
    // 上架
    onShelfItem: async (id: number, message = true) => {
      if (message) {
        ElMessageBox.confirm(t('common.onShelfMessage'), t('common.onShelfWarning'), {
          confirmButtonText: t('common.ok'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }).then(async () => {
          await onShelfData(id)
        })
      } else {
        await onShelfData(id)
      }
    },
    // 下架
    offShelfItem: async (id: number, message = true) => {
      if (message) {
        ElMessageBox.confirm(t('common.offShelfMessage'), t('common.offShelfWarning'), {
          confirmButtonText: t('common.ok'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }).then(async () => {
          await offShelfData(id)
        })
      } else {
        await offShelfData(id)
      }
    }
  }

  config?.props && methods.setProps(config.props)

  return {
    register,
    elTableRef,
    tableObject,
    methods
  }
}
