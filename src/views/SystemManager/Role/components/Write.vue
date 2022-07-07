<script setup lang="ts">
import { Form } from '@/components/Form'
import { Tree } from '@/components/Tree'
import { ElRow, ElCol } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { TableData } from '@/api/systemManager/role/types'
import { useValidator } from '@/hooks/web/useValidator'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
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

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>

<template>
  <ElRow>
    <ElCol :span="12">
      <Form :rules="rules" @register="register" />
    </ElCol>
    <ElCol :span="12">
      <Tree />
    </ElCol>
  </ElRow>
</template>
