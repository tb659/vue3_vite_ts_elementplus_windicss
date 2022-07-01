<template>
  <div>{{ msg1 }}</div>
  <div> <slot name="one">one</slot></div>
  <div> <slot name="two">two</slot></div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Test',
  props: {
    msg: {
      type: String
    }
  },
  setup(props, { attrs, slots, emit, expose }) {
    let msg1 = ref('test')
    console.log(props)
    console.log(attrs)
    console.log(slots.one)
    console.log(emit)
    expose({ qw: msg1 })
    return {
      msg1
    }
  }
})
</script>
<style lang="less" scoped>
// TODO
</style>
