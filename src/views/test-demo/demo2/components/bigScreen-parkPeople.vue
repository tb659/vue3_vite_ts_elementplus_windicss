<template>
  <!-- 当日游园人数 -->
  <div class="parkPeople">
    <div class="parkPeople_title">当日游园人数</div>
    <div class="peopleNum">
      <CountTo
        ref="countRef1"
        :start-val="startVal1"
        :end-val="endVal1"
        :duration="duration"
        :decimals="decimals"
        :separator="separator"
        prefix=""
        suffix=""
        :autoplay="autoplay"
        class="text-35px font-bold text-[var(--scrollNum-00FFBC)]"
      />
      <span class="unit">人</span></div
    >
  </div>
</template>
<script setup lang="ts">
import { CountTo } from '@/components/CountTo'
import { ref, unref } from 'vue'

const duration = ref(3000) //数字滚动过渡时间
const decimals = ref(0) //保留几位小数
const separator = ref('') //分隔符
const autoplay = ref(false) //是否自动播放

const countRef1 = ref<ComponentRef<typeof CountTo>>() //标记ref元素
const startVal1 = ref(0) //开始数字
const endVal1 = ref(5699) //结束数字

// 让数字动起来
function startNum() {
  unref(countRef1)?.start()
}
setTimeout(() => {
  startNum()
}, 1000)
</script>
<style lang="less" scoped>
.parkPeople {
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;

  .parkPeople_title {
    font-size: 28px;
    color: #fff;
  }

  .peopleNum {
    margin-top: 5px;

    .unit {
      color: #fff;
    }
  }
}
</style>
