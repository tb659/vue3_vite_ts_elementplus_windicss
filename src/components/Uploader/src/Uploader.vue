<script setup lang="ts">
import { ElUpload, ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { reactive, ref, unref, watch } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { REQUEST_URL } from '@/config/axios/config'
import { REQUEST_TOKEN_KEY } from '@/config/axios/config'
import { getToken } from '@/utils/auth'

const { t } = useI18n()

const emit = defineEmits(['change', 'update:modelValue'])

const uploadHeader = reactive({})
uploadHeader[REQUEST_TOKEN_KEY] = getToken()
const imageUrl = ref('')

const props = defineProps({
  fileName: propTypes.string.def('file'),
  uploadUrl: propTypes.string.def('/api/file/upload?accessLevel=PUBLIC'),
  modelValue: propTypes.string.def('')
})

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(imageUrl)) return
    imageUrl.value = REQUEST_URL + val
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

const handleSuccess: UploadProps['onSuccess'] = async (res, uploadFile) => {
  const formData = new FormData()
  formData.append(props.fileName, uploadFile.raw!)
  ElMessage.success(t('common.uploadSuccess'))
  emit('update:modelValue', res.data)
}
</script>

<template>
  <ElUpload
    class="avatar-uploader"
    v-bind="$attrs"
    :action="REQUEST_URL + $props.uploadUrl"
    :headers="uploadHeader"
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
