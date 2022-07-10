<script setup lang="ts">
import { ElUpload, ElMessage } from 'element-plus'
import type { UploadProps, UploadInstance } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { ref, unref, watch } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { requestUrl } from '@/config/axios/config'
import { postUploadApi } from '@/api/common'

const { t } = useI18n()

const emit = defineEmits(['change', 'update:modelValue'])

const uploadRef = ref<UploadInstance>()

const imageUrl = ref('')

const props = defineProps({
  accessLevel: propTypes.oneOf<UploadAccessLevel[]>(['PUBLIC', 'PRIVATE']).def('PUBLIC'),
  modelValue: propTypes.string.def('')
})

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(imageUrl)) return
    imageUrl.value = requestUrl + val
  },
  { immediate: true }
)

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const { size } = rawFile
  if (size === 0) {
    ElMessage.warning(t('common.noUpload'))
    return false
  }
  return true
}

const handleSuccess: UploadProps['onSuccess'] = async (_, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  const formData = new FormData()
  formData.append('file', uploadFile.raw!)
  const res = await postUploadApi(props.accessLevel, formData)
  if (res) {
    ElMessage.success(t('common.uploadSuccess'))
    emit('update:modelValue', res.data)
  }
}
</script>

<template>
  <ElUpload
    ref="uploadRef"
    class="avatar-uploader"
    v-bind="$attrs"
    :action="requestUrl"
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
      :size="26"
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
