<script setup lang="ts">
import { ElUpload, ElMessage } from 'element-plus'
import type { UploadProps, UploadInstance } from 'element-plus'
import { PropType, ref, watch } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'

const uploadRef = ref<UploadInstance>()

const { t } = useI18n()

const imageUrl = ref('')

const emit = defineEmits(['handle-upload'])

const props = defineProps({
  accessLevel: {
    type: String as PropType<'PUBLIC' | 'PRIVATE'>,
    default: () => 'PUBLIC'
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const { size } = rawFile

  if (size === 0) {
    ElMessage.warning(t('common.noUpload'))
    return false
  }

  return true
}

watch(
  () => uploadRef,
  (curr) => {
    const data = props.accessLevel
    console.log(data, curr.value)
  },
  { deep: true, immediate: true }
)
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log('response, uploadFile', response, uploadFile)
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  emit('handle-upload')
}
</script>

<template>
  <ElUpload
    ref="uploadRef"
    class="avatar-uploader"
    v-bind="$attrs"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <Icon
      v-else
      class="cursor-pointer is-hover"
      :icon="'ant-design:upload-outlined'"
      color="var(--el-color-info)"
      size="26"
    />
  </ElUpload>
</template>

<style lang="less">
@size: 178px;

.avatar-uploader .el-upload {
  position: relative;
  width: @size;
  height: @size;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: @size;
  height: @size;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
