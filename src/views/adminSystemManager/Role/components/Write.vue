<script setup lang="ts">
import { ElRow, ElCol, ElTree } from 'element-plus'
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, ref, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { getResourceListApi } from '@/api/adminSystemManager/resource'
import { ResourceData } from '@/api/adminSystemManager/resource/types'
import { RoleData } from '@/api/adminSystemManager/role/types'
import { listToTree } from '@/utils/tree'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<RoleData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  name: [required()],
  code: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema: props.formSchema
})

const treeRef = ref<ComponentRef<typeof ElTree>>()

const defaultProps = reactive({ children: 'children', label: 'name' })

const defaultExpandedKeys = ref<number[]>([])
watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods
    setValues(currentRow)
  },
  { deep: true, immediate: true }
)

const resourceList = ref<ResourceData[]>([])

const menuList = ref<ResourceData[]>([])

const getResourceList = async () => {
  const res = await getResourceListApi({ page: 1, size: 99 })
  if (res) {
    menuList.value = res.data.rows
    resourceList.value = listToTree(res.data.rows)
  }
}

getResourceList()

const hasSetDefaultKeys = ref(false)

watch(
  () => resourceList,
  (curr) => {
    if (!props.currentRow?.resourceList) return
    if (curr.value.length && treeRef.value && !hasSetDefaultKeys.value) {
      console.log(hasSetDefaultKeys.value)
      hasSetDefaultKeys.value = true
      setCheckedkeys(menuList.value, props.currentRow)
    }
  },
  { deep: true, immediate: true }
)

const setCheckedkeys = (menuList, currentRow) => {
  let keys = currentRow.resourceList
    .filter((item) => menuList.filter((menu) => menu.id === item.id && menu.parentId !== 0).length)
    .map((item) => item.id)
  defaultExpandedKeys.value = keys
  treeRef.value!.setCheckedKeys(keys)
}

defineExpose({
  elFormRef,
  getFormData: methods.getFormData,
  treeRef
})
</script>

<template>
  <ElRow>
    <ElCol :span="14">
      <Form :rules="rules" @register="register" />
    </ElCol>
    <ElCol :span="9" :offset="1" style="min-height: 500px">
      <ElTree
        ref="treeRef"
        :data="resourceList"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
      />
    </ElCol>
  </ElRow>
</template>
