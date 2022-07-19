<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
// import { requestUrl } from '@/config/axios/config'

const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('map')

const emit = defineEmits(['change', 'update:modelValue'])

// http://120.55.167.167:9202
// http://127.0.0.1:5500/public
const pos = '117.7437357785148,39.153071164096424'

const props = defineProps({
  iframeSrc: propTypes.string.def(`${''}/map.html`),
  modelValue: propTypes.string.def('')
})

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
onMounted(() => {
  window.addEventListener('message', getPosition, false)
})
onUnmounted(() => {
  window.removeEventListener('message', getPosition)
})
</script>

<template>
  <div :class="`${prefixCls}-map`">
    <iframe
      v-bind="$attrs"
      width="100%"
      height="500px"
      :src="`${props.iframeSrc}?${positon}--${zoom}`"
      frameborder="0"
    ></iframe>
  </div>
</template>
<style lang="less">
@prefix-cls: ~'@{namespace}-map';
.@{prefix-cls}-map {
  width: 100%;
}
</style>
