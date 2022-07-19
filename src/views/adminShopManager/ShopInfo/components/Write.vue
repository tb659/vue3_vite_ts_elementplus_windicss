<script setup lang="ts">
import { ElLink } from 'element-plus'
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { useValidator } from '@/hooks/web/useValidator'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<ShopInfoData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  name: [required()],
  introduction: [required()],
  mchCategory: [required()],
  mchType: [required()],
  gis: [required('请在地图上点击选择位置')],
  tips: [required()],
  payQrCode: [required()],
  tipTemplate: [required()]
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
  { deep: true, immediate: true }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>

<template>
  <Form :rules="rules" @register="register">
    <template #tips>
      <div>
        <ElLink
          type="primary"
          :underline="false"
          class="text-stroke-cyan-400"
          href="https://lbsyun.baidu.com/jsdemo.htm#kMapClickEvent"
          target="_blank"
        >
          <!-- 打开链接，在新窗口中的地图上点击选择位置，并在弹窗中复制经纬度坐标粘贴在下面的输入框 -->
          在地图上点击选择位置，并在弹窗中复制经纬度坐标粘贴在下面的输入框
        </ElLink>
      </div>
    </template>
  </Form>
</template>
