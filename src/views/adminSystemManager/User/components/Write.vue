<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { UserData } from '@/api/adminSystemManager/user/types'
import { useI18n } from '@/hooks/web/useI18n'

type Callback = (error?: string | Error | undefined) => void

const { required } = useValidator()

const { t } = useI18n()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<UserData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const { register, methods, elFormRef } = useForm({
  schema: props.formSchema
})

const isEqual = async (_, value: string, callback: Callback) => {
  const data = (await methods.getFormData()) as UserData
  if (data.newPassword === value) {
    callback()
  } else {
    callback(new Error(t('systemManager.notEqual')))
  }
}

const rules = reactive({
  username: [required()],
  roleList: [required()],
  password: [required()],
  newPassword: [required()],
  confirmPassword: [required(), { validator: isEqual }]
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods
    setValues(currentRow)
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
