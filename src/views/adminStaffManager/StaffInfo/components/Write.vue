<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { StaffInfoData } from '@/api/adminStaffManager/staffInfo/types'
import { cloneDeep } from 'lodash-es'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<StaffInfoData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  name: [required()],
  workNo: [required()],
  empNo: [required()],
  dutyGroupId: [required()],
  mchId: [required()],
  handset: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema: props.formSchema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods
    let data = cloneDeep(currentRow)
    data.dutyGroupId = data.dutyGroup.id
    data.merchantId = data.merchantIds?.split(',').map((id) => +id) || []
    setValues(data)
  },
  { deep: true, immediate: true }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>

<template>
  <Form :rules="rules" @register="register" />
</template>
