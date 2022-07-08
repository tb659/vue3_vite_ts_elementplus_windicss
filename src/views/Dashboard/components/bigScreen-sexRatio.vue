<template>
  <div class="sexRatio" ref="sexRatio">
    <!-- 背景色柱子 -->
    <div
      class="wowen"
      :style="`width:50%;height:${wowenVal}%;border-right: ${
        elWidth / 2
      }px solid #E58584;border-top: ${elWidth / 2}px solid transparent;'`"
    >
    </div>
    <div
      class="sexType"
      :style="`width:50%;height:${manVal}%;border-left: ${
        elWidth / 2
      }px solid #4DAEFF;border-top: ${elWidth / 2}px solid transparent;'`"
    >
    </div>
    <div class="valueBar">
      <div class="valueBarItem">
        <div class="vlaue">{{ wowenVal }}%</div>
        <div class="imgBox">
          <img src="@/assets/imgs-bigScreen/bigScreen31.png" alt="" />
        </div>
      </div>
      <div class="valueBarItem">
        <div class="vlaue">{{ manVal }}%</div>
        <div class="imgBox">
          <img src="@/assets/imgs-bigScreen/bigScreen30.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
let manVal = ref(40)
let wowenVal = ref(60)

let elWidth = ref(0) // 元素的宽度
let sexRatio = ref<HTMLInputElement | null>(null)
onMounted(() => {
  if (sexRatio.value) {
    elWidth.value = sexRatio.value.offsetWidth
  }
})
</script>
<style lang="less" scoped>
.sexRatio {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;

  .valueBar {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    font-weight: bold;
    color: #fff;
    text-align: center;
    // align-items: center;
    justify-content: center;

    .valueBarItem {
      width: 50%;

      .imgBox {
        display: flex;
        width: 100%;
        justify-content: center;

        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
