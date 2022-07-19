<script setup lang="ts">
import { ElUpload, ElButton } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { reactive, ref, unref, watch } from 'vue'
import { requestUrl } from '@/config/axios/config'
import { REQUEST_TOKEN_KEY } from '@/config/axios/config'
import { getToken } from '@/utils/auth'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('uploaders')

const { t } = useI18n()

const emit = defineEmits(['change', 'update:modelValue'])

// 请求头
const uploadHeader = reactive({})

uploadHeader[REQUEST_TOKEN_KEY] = getToken()

const props = defineProps({
  fileName: propTypes.string.def('file'),
  uploadUrl: propTypes.string.def('/api/file/upload?accessLevel=PUBLIC'),
  modelValue: propTypes.string.def('')
})

// 图片数组
const fileList = ref<UploadUserFile[]>([
  // {
  //   name: '5eab7b55e34b2bdef8a51b4854aef4cb.png',
  //   uid: 1278346128,
  //   url: requestUrl + '/public/10/ab/10ab4e2c6e644931880dba2528b4717e.png'
  // },
  // {
  //   name: '5eab7b55e34b2bdef8a51b4854aef4cb.png',
  //   uid: 1278346118,
  //   url: requestUrl + '/public/73/95/739562f5b63b4ad796d53959494a8bc0.png'
  // }
])

const fileName = ref<string[]>([])

watch(
  () => props.modelValue,
  (val: any) => {
    if (!val) return
    let fileArr = unref(JSON.parse(val))
    fileArr.forEach((item, index) => {
      fileArr[index] = {
        name: item,
        uid: new Date().getTime(),
        url: requestUrl + item
      }
      const name = fileName.value.filter((filename) => filename === item)[0]
      !name && fileName.value.push(item)
    })
    fileList.value = fileArr
    // console.log(unref(val), fileList.value, unref(JSON.parse(val)), fileArr, '回填的数据')
  },
  { immediate: true }
)
const handleSuccess: UploadProps['onSuccess'] = async (res) => {
  const name = fileName.value.filter((filename) => filename === res.data)[0]
  !name && fileName.value.push(res.data)
  if (fileList.value.length == fileName.value.length) {
    emit('update:modelValue', JSON.stringify(fileName.value))
  }
}

// 移除事件
const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
  // console.log(uploadFile, uploadFiles, fileList.value)
  fileName.value.forEach((item, index) => {
    if (uploadFile.name == item) {
      fileName.value.splice(index, 1)
    }
  })
  emit('update:modelValue', JSON.stringify(fileName.value))
}

const dialogImageUrl = ref('')

const dialogVisible = ref(false)

// 预览图
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  console.log(dialogImageUrl.value)
  dialogVisible.value = true
}
</script>

<template>
  <ElUpload
    :class="prefixCls"
    class="avatar-uploader"
    v-bind="$attrs"
    v-model:file-list="fileList"
    list-type="picture-card"
    :action="requestUrl + $props.uploadUrl"
    :multiple="true"
    :headers="uploadHeader"
    :on-remove="handleRemove"
    :on-preview="handlePictureCardPreview"
    :on-success="handleSuccess"
  >
    <Icon
      class="cursor-pointer is-hover"
      :icon="'ant-design:upload-outlined'"
      color="var(--el-color-info)"
      :size="26"
    />
  </ElUpload>
  <Dialog v-model="dialogVisible" :title="'预览'">
    <div>
      <img style="width: 100%" :src="dialogImageUrl" alt="" />
    </div>
    <template #footer>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-uploaders';

@size: 146px;

.@{prefix-cls} {
  .el-upload-list__item,
  .el-upload {
    width: @size;
    height: @size;
  }
}
</style>
