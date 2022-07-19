<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { LeaseGoodData } from '@/api/adminVenueManager/leaseGood/types'
import { useValidator } from '@/hooks/web/useValidator'
import { cloneDeep } from 'lodash-es'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<LeaseGoodData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  name: [required()],
  productImage: [required()],
  mchId: [required()],
  leaseDeposit: [required()],
  leaseDepositMoney: [required()],
  leaseMaxCount: [required()],
  price: [required()],
  leaseUnit: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema: props.formSchema
})

const getForm = (form) => {
  const { setValues, setSchema } = methods
  let schema = [
    {
      field: 'leaseDepositMoney',
      path: 'hidden',
      value: true
    }
  ]
  if (!form.leaseDeposit) {
    form.leaseDepositMoney = 0
    schema[0].value = true
    setSchema(schema)
    setValues(form)
  } else {
    schema[0].value = false
    setSchema(schema)
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods
    let data = cloneDeep(currentRow)
    data.mchId = data.mch.id
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
  <Form :rules="rules" @register="register" @get-form="getForm" />
</template>
