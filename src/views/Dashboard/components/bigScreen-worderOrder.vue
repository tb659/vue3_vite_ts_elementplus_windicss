<template>
  <!-- 智能工单 -->
  <div class="worderOrder">
    <div class="worderOrder_title">智能工单</div>
    <div class="workerOrderBox">
      <div class="workerOrderItem" v-for="(item, index) in workerOrderData" :key="index">
        <div class="labelBox">
          <img :src="item.imgUrl" alt="" />
          <div class="itemName">{{ item.name }}</div>
        </div>
        <div class="progressBox">
          <ElProgress
            type="circle"
            :width="50"
            :color="item.color"
            :stroke-width="7"
            :percentage="item.value"
            :format="format"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElProgress } from 'element-plus'
import { IMG_ICON } from '@/utils/img'
import { reactive } from 'vue'

import { workerOrder } from '@/views/Dashboard/components/bigScreen'

let workerOrderData = reactive<workerOrder[]>([
  {
    name: '执行中',
    value: 38,
    color: 'rgb(0,128,255)',
    imgUrl: IMG_ICON['workerOrder1']
  },
  {
    name: '延期中',
    value: 20,
    color: 'rgb(252,62,87)',
    imgUrl: IMG_ICON['workerOrder2']
  },
  {
    name: '已完成',
    value: 15,
    color: 'rgb(8,182,107)',
    imgUrl: IMG_ICON['workerOrder3']
  },
  {
    name: '延期中',
    value: 50,
    color: 'rgb(129,143,167)',
    imgUrl: IMG_ICON['workerOrder4']
  }
])
function format(percentage) {
  return percentage
}
</script>
<style lang="less" scoped>
// 修改进度条的颜色
/deep/.el-progress-circle__track {
  stroke: #232344;
}
// 修改环形进度条内文字的样式
/deep/.el-progress__text {
  font-weight: bold;
  color: #fff;
}

.worderOrder {
  width: 100%;
  padding: 0 15px;
  background-image: url('@/assets/imgs-bigScreen/bigScreen27.png');
  background-size: 100% 100%;
  box-sizing: border-box;

  .worderOrder_title {
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    color: #fff;
  }

  .workerOrderBox {
    .workerOrderItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0;

      .labelBox {
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }

        .itemName {
          font-size: 13px;
          color: #fff;
        }
      }
    }
  }
}
</style>
