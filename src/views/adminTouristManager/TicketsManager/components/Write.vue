<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { TicketListData } from '@/api/adminTouristManager/ticketsManager/types'
import { useValidator } from '@/hooks/web/useValidator'
import { cloneDeep } from 'lodash-es'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TicketListData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  mchId: [required()],
  ticketType: [required()],
  // touristGroup: [required()],
  price: [required()],
  onShelf: [required()]
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
  <Form :rules="rules" @register="register" />
</template>
