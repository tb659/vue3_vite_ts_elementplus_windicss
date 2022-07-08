<template>
  <div class="LivingConsumption">
    <div class="itemBox" v-for="(item, index) in tempData" :key="index">
      <div class="iconBox">
        <img :src="item.icon" alt="" />
      </div>
      <div class="itemName">{{ item.name }}</div>
      <div class="itemValue">{{ item.value }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LifeIndicators } from '@/views/Dashboard/components/bigScreen'
import { reactive } from 'vue'
// 引入本地动态图片
import { IMG_ICON } from '@/utils/img'

let tempData = reactive<LifeIndicators[]>([
  {
    name: '综合',
    icon: IMG_ICON['live1'],
    value: '1842'
  },
  {
    name: '电',
    icon: IMG_ICON['live2'],
    value: '1842KWH'
  },
  {
    name: '水',
    icon: IMG_ICON['live3'],
    value: '1842T'
  },
  {
    name: '气',
    icon: IMG_ICON['live4'],
    value: '1842L'
  },
  {
    name: '累计减排',
    icon: IMG_ICON['live5'],
    value: '1842T'
  }
])
</script>
<style lang="less" scoped>
.LivingConsumption {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px 30px;
  overflow: hidden;
  background-image: url('@/assets/imgs-bigScreen/bigScreen26.png');
  background-size: 100% 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;

  .itemBox {
    display: flex;
    width: 20%;
    flex-direction: column;
    align-items: center;
    @num: 60px;

    .iconBox {
      display: flex;
      width: @num;
      height: @num;
      border: 2px solid rgb(43, 155, 206);
      border-radius: 50%;
      justify-content: center;
      align-items: center;

      img {
        width: 50%;
        height: 50%;
      }
    }

    .itemName {
      font-size: 12px;
      color: #fff;
    }

    .itemValue {
      overflow: hidden;
      font-size: 16px;
      color: rgb(43, 155, 206);
    }
  }
}
</style>
