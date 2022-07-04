<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Search } from '@/components/Search'
import { reactive, ref, unref } from 'vue'
import { ElButton } from 'element-plus'

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('formDemo.input'),
    component: 'Input'
  }
])

const isGrid = ref(false)

const changeGrid = (grid: boolean) => {
  isGrid.value = grid
}

const layout = ref('inline')

const changeLayout = () => {
  layout.value = unref(layout) === 'inline' ? 'bottom' : 'inline'
}

const buttomPosition = ref('left')

const changePosition = (position: string) => {
  layout.value = 'bottom'
  buttomPosition.value = position
}
</script>

<template>
  <ContentWrap :title="`${t('searchDemo.search')} ${t('searchDemo.operate')}`">
    <ElButton @click="changeGrid(true)">{{ t('searchDemo.grid') }}</ElButton>
    <ElButton @click="changeGrid(false)">
      {{ t('searchDemo.restore') }} {{ t('searchDemo.grid') }}
    </ElButton>

    <ElButton @click="changeLayout">
      {{ t('searchDemo.button') }} {{ t('searchDemo.position') }}
    </ElButton>

    <ElButton @click="changePosition('left')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.left') }}
    </ElButton>
    <ElButton @click="changePosition('center')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.center') }}
    </ElButton>
    <ElButton @click="changePosition('right')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.right') }}
    </ElButton>
  </ContentWrap>

  <ContentWrap :title="t('searchDemo.search')" :message="t('searchDemo.searchDes')">
    <Search :schema="schema" :is-col="isGrid" :layout="layout" :buttom-position="buttomPosition" />
  </ContentWrap>
</template>
