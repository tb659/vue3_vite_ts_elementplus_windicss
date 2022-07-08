<template>
  <div class="weather">
    <div class="mainTop">
      <div class="topItem">
        <div class="itemLabel text-[var(--scrollNum-00FFBC)]">36°C</div>
        <div class="itemValue">温度</div>
      </div>
      <div class="topItem">
        <div class="itemLabel text-[var(--scrollNum-00FFBC)]">44°C</div>
        <div class="itemValue">湿度</div>
      </div>
      <div class="topItem">
        <div class="itemLabel itemLabel_">优良</div>
        <div class="itemValue">空气质量</div>
      </div>
    </div>
    <div class="mainBottom">
      <div class="bottomTitle">近日天气变化</div>
      <div class="weatherBox">
        <dov class="weatherItem" v-for="(item, index) in weatherArr" :key="index">
          <div class="dateBox">{{ item.date }}</div>
          <div class="weatherType">
            {{ item.type }}
            <img :src="item.imgUrl" alt="" />
          </div>
        </dov>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { weather } from '@/views/Dashboard/components/bigScreen'
import { reactive } from 'vue'
// 引入本地动态图片
import { IMG_ICON } from '@/utils/img'
let weatherArr = reactive<weather[]>([
  {
    type: '多云',
    date: '7月1日',
    imgUrl: IMG_ICON['weather1']
  },
  {
    type: '雨天',
    date: '7月2日',
    imgUrl: IMG_ICON['weather2']
  },
  {
    type: '阴天',
    date: '7月3日',
    imgUrl: IMG_ICON['weather3']
  },
  {
    type: '晴天',
    date: '7月4日',
    imgUrl: IMG_ICON['weather4']
  },
  {
    type: '多云',
    date: '7月5日',
    imgUrl: IMG_ICON['weather1']
  }
])
</script>
<style lang="less" scoped>
.weather {
  width: 250px;

  .mainTop {
    display: flex;
    width: 80%;
    font-weight: bold;
    justify-content: space-between;

    .topItem {
      font-size: 16px;
      text-align: center;
      @height: 25px;

      .itemLabel {
        height: @height;
      }

      .itemLabel_ {
        font-size: 15px;
        line-height: @height;
        color: #fff;
        background-color: #00ffbc;
        border-radius: calc(@height / 2);
      }

      .itemValue {
        margin-top: 5px;
        font-size: 16px;
        color: #fff;
      }
    }
  }

  .mainBottom {
    margin-top: 20px;

    .bottomTitle {
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }

    .weatherBox {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .dateBox {
        font-size: 13px;
        font-weight: bold;
        color: #fff;
      }

      .weatherType {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #fff;

        img {
          width: 12px;
          height: 12px;
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
