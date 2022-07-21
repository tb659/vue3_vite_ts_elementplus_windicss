<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
// import { REQUEST_URL } from '@/config/axios/config'

const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('map')

const emit = defineEmits(['change', 'update:modelValue'])

const props = defineProps({
  modelValue: propTypes.string.def('')
})

const url = 'http://127.0.0.1:5500/public/map.html'

const iframeSrc = import.meta.env.VITE_API_BASEPATH === 'base' ? url : 'map.html'

const pos = '117.7437357785148,39.153071164096424'

const positon = props.modelValue || pos

const zoom = ref('17')

const getPosition = (e) => {
  if (typeof e.data === 'string') {
    ElMessage.success(`${t('common.select')}${t('common.success')}`)
    const data = e.data.split('--')
    zoom.value = data[1]
    emit('update:modelValue', data[0])
  }
}

const isFullScreen = ref(false)

const toggleFull = () => {
  isFullScreen.value = !isFullScreen.value
}

onMounted(() => {
  window.addEventListener('message', getPosition, false)
})

onUnmounted(() => {
  window.removeEventListener('message', getPosition)
})
</script>

<template>
  <div :class="[`${prefixCls}-map`, isFullScreen ? 'fullScreen' : '']">
    <Icon
      class="cursor-pointer is-hover fullIcon"
      :icon="isFullScreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
      color="var(--el-color-info)"
      :size="20"
      @click="toggleFull"
    />
    <iframe
      v-bind="$attrs"
      width="100%"
      :height="isFullScreen ? '100%' : '500px'"
      :src="`${iframeSrc}?${positon}--${zoom}`"
      frameborder="0"
    ></iframe>
  </div>
</template>
<style lang="less">
@prefix-cls: ~'@{namespace}-map';
.@{prefix-cls}-map {
  width: 100%;
}

.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
}

.fullIcon {
  position: absolute;
  top: 8px;
  right: 6px;
}
</style>
