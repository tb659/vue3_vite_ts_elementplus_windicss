<script setup lang="ts">
import { ElLink } from 'element-plus'
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { EpartmentData } from '@/api/adminStaffManager/epartment/types'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<EpartmentData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  name: [required()]
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
      <iframe
        width="100%"
        height="800px"
        src="http://127.0.0.1:5500/src/views/adminShopManager/ShopInfo/components/map.html"
        frameborder="0"
      ></iframe>
    </template>
  </Form>
</template>
