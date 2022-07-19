<script setup lang="ts">
import { onBeforeUnmount, computed, PropType, unref, nextTick, ref, watch, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  i18nChangeLanguage,
  SlateElement
} from '@wangeditor/editor'
import { propTypes } from '@/utils/propTypes'
import { isNumber } from '@/utils/is'
import { ElMessage } from 'element-plus'
import { useLocaleStore } from '@/store/modules/locale'
import { requestUrl } from '@/config/axios/config'
import { postUploadApi } from '@/api/common'

type ImageElement = SlateElement & {
  src: string
  alt: string
  url: string
  href: string
}

const localeStore = useLocaleStore()

const currentLocale = computed(() => localeStore.getCurrentLocale)

i18nChangeLanguage(unref(currentLocale).lang)

const props = defineProps({
  editorId: propTypes.string.def('wangeEditor-1'),
  height: propTypes.oneOfType([Number, String]).def('400px'),
  editorConfig: {
    type: Object as PropType<IEditorConfig>,
    default: () => undefined
  },
  fileName: propTypes.string.def('file'),
  uploadUrl: propTypes.string.def('/api/file/upload?accessLevel=PUBLIC'),
  modelValue: propTypes.string.def('')
})

const emit = defineEmits(['change', 'update:modelValue'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>()

const valueHtml = ref('')

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueHtml)) return
    valueHtml.value = val
  },
  { immediate: true }
)

// 监听
watch(
  () => valueHtml.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['group-video' /* 排除菜单组，写菜单组 key 的值即可 */]
}

// 编辑器配置
const editorConfig = computed((): IEditorConfig => {
  return Object.assign(
    {
      readOnly: false,
      customAlert: (s: string, t: string) => {
        switch (t) {
          case 'success':
            ElMessage.success(s)
            break
          case 'info':
            ElMessage.info(s)
            break
          case 'warning':
            ElMessage.warning(s)
            break
          case 'error':
            ElMessage.error(s)
            break
          default:
            ElMessage.info(s)
            break
        }
      },
      autoFocus: false,
      scroll: true,
      uploadImgShowBase64: true,
      MENU_CONF: {
        insertImage: {
          onInsertedImage(imageNode: ImageElement | null) {
            if (imageNode == null) return

            // const { src, alt, url, href } = imageNode
            // console.log('inserted image', src, alt, url, href)
          },
          checkImage: customCheckImageFn, // 也支持 async 函数
          parseImageSrc: customParseImageSrc // 也支持 async 函数
        },
        editImage: {
          onUpdatedImage(imageNode: ImageElement | null) {
            if (imageNode == null) return

            // const { src, alt, url } = imageNode
            // console.log('updated image', src, alt, url)
          },
          checkImage: customCheckImageFn, // 也支持 async 函数
          parseImageSrc: customParseImageSrc // 也支持 async 函数
        },
        uploadImage: {
          // 自定义上传
          async customUpload(file: File, insertFn) {
            // file 即选中的文件
            // 自己实现上传，并得到图片 url alt href
            // 最后插入图片
            const url = await customUploadFn(file)
            insertFn(url)
          }
        }
      }
    },
    props.editorConfig || {}
  )
})

const customUploadFn = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await postUploadApi(props.uploadUrl, formData)
  return requestUrl + res.data
}
// 自定义校验图片
const customCheckImageFn = (src: string): boolean | undefined | string => {
  if (!src) {
    return
  }
  if (src.indexOf('http') !== 0) {
    return '图片网址必须以 http/https 开头'
  }
  return true

  // 返回值有三种选择：
  // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
  // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
  // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}

// 转换图片链接
const customParseImageSrc = (src: string): string => {
  if (src.indexOf('http') !== 0) {
    return `http://${src}`
  }
  return src
}

const editorStyle = computed(() => {
  return {
    height: isNumber(props.height) ? `${props.height}px` : props.height
  }
})

// 回调函数
const handleChange = (editor: IDomEditor) => {
  emit('change', editor)
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = unref(editorRef.value)
  if (editor === null) return

  // 销毁，并移除 editor
  editor?.destroy()
})

const getEditorRef = async (): Promise<IDomEditor> => {
  await nextTick()
  return unref(editorRef.value) as IDomEditor
}

defineExpose({
  getEditorRef
})
</script>

<template>
  <div class="border-1 border-solid border-[var(--tags-view-border-color)]">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      :editorId="editorId"
      :defaultConfig="toolbarConfig"
      class="border-bottom-1 border-solid border-[var(--tags-view-border-color)]"
    />
    <!-- 编辑器 -->
    <Editor
      v-model="valueHtml"
      :editorId="editorId"
      :defaultConfig="editorConfig"
      :style="editorStyle"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
  </div>
</template>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.w-e-full-screen-container {
  z-index: 3;
}
</style>
