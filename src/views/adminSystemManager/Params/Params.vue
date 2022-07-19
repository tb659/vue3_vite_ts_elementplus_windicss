<script setup lang="ts">
import Form from '@/components/Form/src/Form.vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useForm } from '@/hooks/web/useForm'
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { getEpcSettingApi, putEpcSettingApi } from '@/api/common'
import { ElMessage } from 'element-plus'

const { required } = useValidator()

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'epc',
    label: t('systemManager.switch'),
    value: false,
    component: 'Switch',
    formItemProps: {
      rules: [required()]
    }
  }
])

const { register, methods } = useForm({ schema })

const getData = async () => {
  const { setValues } = methods
  const res = await getEpcSettingApi()
  if (res) {
    setValues({
      epc: res.data === 'true' ? true : false
    })
  }
}
getData()

const count = ref(-1)

const getForm = async (form) => {
  if (count.value > 0) {
    const res = await putEpcSettingApi(form.epc + '')
    res && ElMessage.success(t('common.saveSuccess'))
  }
  count.value++
}
</script>

<template>
  <ContentWrap :title="t('systemManager.paramsSetting')">
    <Form @register="register" @get-form="getForm" />
  </ContentWrap>
</template>
